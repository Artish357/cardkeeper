import models from "../models/index.js"
const {Mystery, Threat} = models

export default {
    getAllMysteries() {
        return Mystery.findAll()
    },
    
    getMystery(id) {
        return Mystery.findByPk(id)
    },
    
    async newMystery() {
        const mystery = await Mystery.build({}).save()
        return Mystery.findByPk(mystery.id) // Loads associations eagerly
    },
    
    async updateMystery(id, data) {
        const mystery = await Mystery.findByPk(id)
        return mystery.update(data)
    },
    
    async deleteMystery(id) {
        const mystery = await Mystery.findByPk(id)
        return mystery.destroy() 
    },
    
    async newThreat(MysteryId){
        return Threat.build({MysteryId}).save()
    },

    getThreat(id){
        return Threat.findByPk(id)
    },

    async updateThreat(id, data) {
        const threat = await Threat.findByPk(id)
        return threat.update(data)
    },

    async deleteThreat(id){
        const threat = await Threat.findByPk(id)
        return threat.destroy()
    }
}