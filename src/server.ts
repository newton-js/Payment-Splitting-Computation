import express, { Application } from 'express'
import bodyParser from 'body-parser'
import feeRoute from '@src/routes/feeRoute'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const port = process.env.PORT || 5000
const app: Application = express()

app.use(bodyParser.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/", feeRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))