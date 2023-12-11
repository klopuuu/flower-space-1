const {StatusOrder} = require('../models/models')
const ApiError = require('../error/ApiError')
class StatusOrderController {
    async postStatus(req, res) {
        const {status} = req.body
        const statusorder = await StatusOrder.create({status})
        return res.json(statusorder)
    }

    async getStatus(req, res) {
        const ordstatus = await StatusOrder.findAll()
        return res.json(ordstatus)
    }

    async getOneStatus(req, res) {
        const status = await StatusOrder.findOne({where:{status: req.params.name}})
        return res.json(status)
    }

    async getOneStatusId(req, res) {
        const status = await StatusOrder.findOne({where:{id: req.params.id}})
        return res.json(status)
    }
}

module.exports = new StatusOrderController()