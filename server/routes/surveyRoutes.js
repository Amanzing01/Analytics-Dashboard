import express from 'express';
import { getAllSurveys } from '../controllers/Surver.controller.js';

const router = express.Router();

router.get('/', getAllSurveys);

export default router;