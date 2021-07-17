import {Router} from 'express'
import MysteryController from '../controllers/MysteryController.js'
const {getThreat, updateThreat, deleteThreat} = MysteryController
const router = Router()

/* -------------------------------------------------------------------------- */
/*                               Threat methods                               */
/* -------------------------------------------------------------------------- */

router.get('/:threatId', async (req, res, next)=>{
    try {
        const threatId = req.params['threatId']
        res.json({
            'status': 'ok',
            'data': await getThreat(threatId)
        })
    } catch (err) {
        next(err)
    }
})

router.post('/:threatId', async (req, res, next)=>{
    try {
        const threatId = req.params['threatId']
        res.json({
            'status': 'ok',
            'data': await updateThreat(threatId, req.body)
        })
    } catch (err) {
        next(err)
    }
})

router.delete('/:threatId', async (req, res, next)=>{
    try {
        const threatId = req.params['threatId']
        await deleteThreat(threatId)
        res.json({
            'status': 'ok'
        })
    } catch (err) {
        next(err)
    }
})

export default router