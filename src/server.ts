import express, { Application } from 'express'
import bodyParser from 'body-parser'
import paymentSplitterRoute from '@src/routes/paymentSplitterRoute'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const port = process.env.PORT || 8000
const app: Application = express()

app.use(bodyParser.json())
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/", paymentSplitterRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))