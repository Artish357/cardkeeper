import { Router } from "express";
import MysteryRouter from './MysteryRouter.js'
import ThreatRouter from './ThreatRouter.js'
import YAML from 'yamljs'

const swaggerDocument = YAML.load('./src/openapi.yaml');
const router = Router()

router.use('/mysteries', MysteryRouter)
router.use('/threats', ThreatRouter)
router.get('/openapi.json', (req, res)=>{
    swaggerDocument.servers[0] = {url: `http://${req.get('host')}/api`};
    res.json(swaggerDocument)
})
export default router