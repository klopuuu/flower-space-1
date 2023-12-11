const {Receiving} = require('../models/models')
const ApiError = require('../error/ApiError')
class ReceivingController {
    async postReceiving(req, res) {
        let {choisercv} = req.body
        const receiving = await Receiving.create({choisercv})
        return res.json(receiving)
    }

    async getReceiving(req, res) {
        const rcv = await Receiving.findAll()
        return res.json(rcv)
    }

    async getOneReceiving(req, res) {
        const rcv = await Receiving.findOne({where:{choisercv: req.params.name}})
        return res.json(rcv)
    }
}

module.exports = new ReceivingController()