import express, { Application } from 'express'
import bodyParser from 'body-parser'
import feeRoute from '@src/routes/feeRoute'

const port: string | number = process.env.PORT || 5000
const app: Application = express()

app.use(bodyParser.json())
app.use("/", feeRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))