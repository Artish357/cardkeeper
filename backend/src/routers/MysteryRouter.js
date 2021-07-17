import { Router } from 'express';
import MysteryController from "../controllers/MysteryController.js";
import ServerError from "../ServerError.js";

const { newMystery, getAllMysteries, updateMystery, getMystery, deleteMystery, newThreat } = MysteryController
const router = Router()

/* -------------------------------------------------------------------------- */
/*                               Mystery methods                              */
/* -------------------------------------------------------------------------- */

// Get all mysteries
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
})

// Create new mystery
router.post('/', async (req, res, next) => {
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

// Get mystery specified by id
router.get('/:mysteryId', async (req, res, next) => {
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

// Create new threat for the mystery with mysteryId
router.post('/:mysteryId/threats', async (req, res, next) => {
  try {
    const newMonsterThreatObj = await newThreat(req.params["mysteryId"])
    res.status(200).json({
      "status": "ok",
      "data": newMonsterThreatObj
    });
  } catch (err) {
    next(err)
  }
});

// Update mystery data
router.post('/:mysteryId', async (req, res, next) => {
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

// Delete mystery
router.delete('/:mysteryId', async (req, res, next) => {
  try {
    await deleteMystery(req.params["mysteryId"])
    res.json({
      "status": "ok"
    })
  } catch (err) {
    next(err)
  }
})

export default router;