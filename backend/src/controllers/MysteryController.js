import models from "../models/index.js"
const {Mystery, MonsterThreat} = models

function getAllMysteries() {
    return Mystery.findAll()
}

function getMystery(id) {
    return Mystery.findByPk(id)
}

async function newMystery() {
    return Mystery.build({}).save()
}

async function updateMystery(id, data) {
    const mystery = await Mystery.findByPk(id)
    return mystery.update(data)
}

async function deleteMystery(id) {
    const mystery = await Mystery.findByPk(id)
    return mystery.destroy() 
}

async function newMonsterThreat(MysteryId){
    return MonsterThreat.build({MysteryId}).save()
}

export {getAllMysteries, newMystery, updateMystery, getMystery, deleteMystery, newMonsterThreat}