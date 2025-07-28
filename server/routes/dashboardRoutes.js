import express from 'express';
import {
  getDashboardStats,
  getGenderDistribution,
  getAgeDistribution,
  getSkinTypeDistribution
} from '../controllers/dashboard.Controller.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/gender-distribution', getGenderDistribution);
router.get('/age-distribution', getAgeDistribution);
router.get('/skin-type-distribution', getSkinTypeDistribution);

export default router;