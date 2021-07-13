import { Router } from 'express';
import UserRouter from './User/UserRouter.js';

const router = Router()

router.use('/user', UserRouter);

export default router;