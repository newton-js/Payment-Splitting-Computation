import 'jest';
import request from 'supertest' 
import express from 'express'
import feeRoute from '../routes/feesRoute'
import { mockedTransactionData, mockedFeeConfigurations } from '../data/mockedData'

const app = express()

app.use(express.json())
app.use('/', feeRoute)


describe('POST /compute-transaction-fee', () => {
    beforeAll(async() => {
        await request(app)
            .post('/fees')
            .send({
                FeeConfigurationSpec: mockedFeeConfigurations
            })
    });
    
    it('Should return 200 success statusCode and use FeeID LNPY1223 configuration', async () => {
        const res = await request(app)
            .post('/compute-transaction-fee')
            .send(mockedTransactionData.transaction1)
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual({
                "AppliedFeeID": "LNPY1223",
                "AppliedFeeValue": 120,
                "ChargeAmount": 5120,
                "SettlementAmount": 5000
            })
    });

    it('Should return 200 success statusCode and use FeeID LNPY1221 configuration', async () => {
        const res = await request(app)
        .post('/compute-transaction-fee')
            .send(mockedTransactionData.transaction2)
            expect(res.statusCode).toEqual(200)
            expect(res.body).toEqual({
                "AppliedFeeID": "LNPY1221",
                "AppliedFeeValue": 49,
                "ChargeAmount": 3500,
                "SettlementAmount": 3451
            })
      });

      it('Should return 400 error statusCode for no applicable configuration', async () => {
        const res = await request(app)
            .post('/compute-transaction-fee')
            .send(mockedTransactionData.transaction3)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('Error')
            expect(res.body.Error).toEqual('No fee configuration is applicable to this transaction')
    });
  })