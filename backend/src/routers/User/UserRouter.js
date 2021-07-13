import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../../controllers/UserController';

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json(UserController.defaultMethod());
});

export default router;