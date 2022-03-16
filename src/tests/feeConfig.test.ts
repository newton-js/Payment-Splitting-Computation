import 'jest';
import request from 'supertest' 
import express from 'express'
import feeRoute from '../routes/feesRoute'
import { mockedFeeConfigurations } from '../data/mockedData';

const app = express()

app.use(express.json())
app.use('/', feeRoute)


describe('POST /fees', () => {
    it('Should return a 400 error statusCode', async () => {
        const res = await request(app)
            .post('/fees')
            .send({
            FeeConfigurationSpec: ''
            })
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('error')
            expect(res.body.error).toEqual('No fee configuration is provided')
    });

    it('Should return a 500 error statusCode', async () => {
        const res = await request(app)
            .post('/fees')
            .send({
                FeeConfigurationSpec: []
            })
            expect(res.statusCode).toEqual(500)
            expect(res.body).toHaveProperty('error')
    });

    it('Should return 200 success statusCode', async () => {
        const res = await request(app)
          .post('/fees')
          .send({
            FeeConfigurationSpec: mockedFeeConfigurations
          })
          expect(res.statusCode).toEqual(200)
          expect(res.body).toHaveProperty('status')
          expect(res.body.status).toEqual('ok')
      })
  })