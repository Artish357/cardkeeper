import { Router } from 'express';
import UserRouter from './User/UserRouter';

const router = Router()

router.get('/user', UserRouter);

export default router;