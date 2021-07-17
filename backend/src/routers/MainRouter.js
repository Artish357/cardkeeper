import { Router } from "express";
import MysteryRouter from './MysteryRouter.js'
import ThreatRouter from './ThreatRouter.js'

const router = Router()
router.use('/mysteries', MysteryRouter)
router.use('/threats', ThreatRouter)
export default router