import models from "../models/index.cjs"

function getAllMysteries() {
    return models.Mystery.findAll()
}

function getMystery(id) {
    return models.Mystery.findByPk(id)
}

function newMystery() {
    return models.Mystery.build({}).save()
}

async function updateMystery(id, data) {
    const mystery = await models.Mystery.findByPk(id)
    return mystery.update(data)
}

async function deleteMystery(id) {
    const mystery = await models.Mystery.findByPk(id)
    return mystery.destroy() 
}

export {getAllMysteries, newMystery, updateMystery, getMystery, deleteMystery}