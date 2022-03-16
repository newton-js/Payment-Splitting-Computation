import express, { Application } from 'express'
import bodyParser from 'body-parser'
import feeController from '@src/controllers/feesController'

const port: string | number = process.env.PORT || 5000
const app: Application = express()

app.use(bodyParser.json())
app.use("/", feeController)

app.listen(port, () => console.log(`Server running on port ${port}`))