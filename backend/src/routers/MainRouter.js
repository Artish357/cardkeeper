import { Router } from 'express';
import UserRouter from './UserRouter.js';
import MysteryRouter from "./MysteryRouter.js";

const router = Router()

router.use('/user', UserRouter);
router.use('/mystery', MysteryRouter)

export default router;