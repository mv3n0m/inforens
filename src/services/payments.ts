import Stripe from 'stripe'
import { PAYMENT_STATUS } from '../config/enums'
import { PaymentDbHandler } from '../db/handlers'
import { stripeCreds } from '../envt'

const stripe = require('stripe')(stripeCreds.secretKey)

export default class {
  static async createPaymentIntent(amount: number, currency: string) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    })

    await PaymentDbHandler.createPayment({
      referenceId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    })
    return paymentIntent
  }

  static async confirmPayment(paymentIntentId: string) {
    const { id, status: paymentStatus } = await stripe.paymentIntents.retrieve(
      paymentIntentId,
    )

    const status =
      paymentStatus === 'succeeded'
        ? PAYMENT_STATUS.Success
        : ['canceled', 'payment_failed'].includes(paymentStatus)
        ? PAYMENT_STATUS.Aborted
        : PAYMENT_STATUS.Pending

    await PaymentDbHandler.updatePaymentByReferenceId(id, { status })
    return {
      status: Object.entries(PAYMENT_STATUS).find(
        (item) => item[1] === status,
      )![0],
    }
  }

  static async webhook(body: any, sig?: string | string[]) {
    let event = stripe.webhooks.constructEvent(
      body,
      sig,
      stripeCreds.webhookSecret,
    )

    const status =
      event.type === 'payment_intent.succeeded'
        ? PAYMENT_STATUS.Success
        : ['payment_intent.canceled', 'payment_intent.payment_failed'].includes(
            event.type,
          )
        ? PAYMENT_STATUS.Aborted
        : PAYMENT_STATUS.Pending

    const paymentIntent = event.data.object as Stripe.PaymentIntent
    await PaymentDbHandler.updatePaymentByReferenceId(paymentIntent.id, {
      status,
    })
    return event
  }
}
