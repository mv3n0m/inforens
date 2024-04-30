import { createLogger, transports, format } from 'winston'

const logger = createLogger({
  level: 'info', // Set the logging level
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(), // Log to the console
    // Add additional transports here, such as logging to a file or to a remote service like CloudWatch
  ],
})

export default logger
