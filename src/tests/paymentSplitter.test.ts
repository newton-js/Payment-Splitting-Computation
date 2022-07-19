import 'jest';
import request from 'supertest' 
import express from 'express'
import paymentSplitterRoute from '../routes/paymentSplitterRoute'
import { mockPaymentSplitting } from '../data/mockedData';

const app = express()

app.use(express.json())
app.use('/', paymentSplitterRoute)

describe('POST /split-payments/compute', () => {
    it("Should return a 400 error if 'SplitInfo' property length is less than 1 or greater than 20", async () => {
        const res = await request(app)
            .post('/split-payments/compute')
            .send(mockPaymentSplitting.payload2)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('Error')
            expect(res.body.Error).toEqual("Something went wrong: Error: 'SplitInfo' array can contain only a minimum of 1 split entity and a maximum of 20 entities.")
    });

    it('Should return 200 success statusCode for a valid payload passed', async () => {
        const res = await request(app)
          .post('/split-payments/compute')
          .send(mockPaymentSplitting.payload1)
          expect(res.statusCode).toEqual(200)
          expect(res.body).toHaveProperty('SplitBreakdown')
      })
  })