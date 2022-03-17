import express, { Router } from 'express';
import handler from '../controllers/feeController'

const router: Router = express.Router();

router.post('/fees', handler.feeConfigurationSetup)
router.post('/compute-transaction-fee', handler.feeComputation)

export default router;