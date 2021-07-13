import { Router } from 'express';
import { announce } from '../../controllers/UserController.js';

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json(announce());
});

export default router;