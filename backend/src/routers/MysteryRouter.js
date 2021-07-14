import { Router } from 'express';
import { newMystery, getAllMysteries, updateMystery, getMystery, deleteMystery, newMonsterThreat } from "../controllers/MysteryController.js";
import ServerError from "../ServerError.js";

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const mysteries = await getAllMysteries()
    res.status(200).json({
      "status": "ok",
      "data": mysteries
    })
  } catch (err) {
    next(err)
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const newMysteryObj = await newMystery()
    res.status(200).json({
      "status": "ok",
      "data": newMysteryObj
    });
  } catch (err) {
    next(err)
  }
});

router.post('/id/:mysteryId/newMonsterThreat', async (req, res, next) => {
  try {
    const newMonsterThreatObj = await newMonsterThreat(req.params["mysteryId"])
    res.status(200).json({
      "status": "ok",
      "data": newMonsterThreatObj
    });
  } catch (err) {
    next(err)
  }
});

router.get('/id/:mysteryId', async (req, res, next) => {
  try {
    const mystery = await getMystery(req.params["mysteryId"])
    if (mystery === null) {
      next(new ServerError(404, "Mystery not found"))
    } else {
      res.json({
        "status": "ok",
        "data": mystery
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/id/:mysteryId', async (req, res, next) => {
  try {
    const updated = await updateMystery(req.params["mysteryId"], req.body)
    res.json({
      "status": "ok",
      "data": updated
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/id/:mysteryId', async (req, res, next) => {
  try {
    const deleted = await deleteMystery(req.params["mysteryId"])
    res.json({
      "status": "ok",
      "data": deleted
    })
  } catch (err) {
    next(err)
  }
})

export default router;