require('dotenv').config()
import app from './app'
import { port } from './envt'
import logger from './utils/logger'

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
})
