import express from 'express';
import { derivCallback } from '../controllers/authController.js';

const router = express.Router();

router.post('/deriv-callback', derivCallback);

export default router;