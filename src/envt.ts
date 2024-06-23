export const appSecret = process.env.APP_SECRET || 'secret'
export const jwtExpiry = process.env.JWT_EXPIRY_MINUTES || '525960'
export const jwtRefreshWindow = process.env.JWT_REFRESH_WINDOW || '1'

export const otpExpiryInMinutes = +(process.env.OTP_EXPIRY_MINUTES || '10')

export const baseUrl = process.env.BASE_URL || '/api/v0'
export const port = process.env.PORT || 3333

export const dbCreds = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
}

export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
}
export const s3BucketName = process.env.S3_BUCKET_NAME || ''

export const stripeCreds = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}
