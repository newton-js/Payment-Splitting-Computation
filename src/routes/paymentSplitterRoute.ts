import express, { Router } from 'express';
import handler from '../controllers/paymentSplitter'

const router: Router = express.Router();

router.post('/split-payments/compute', handler.computePaymentSplitting)

export default router;