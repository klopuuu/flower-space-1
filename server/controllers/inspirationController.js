const {User, BinderInspiration, Inspiration} = require('../models/models')
const ApiError = require('../error/ApiError')

class InspirationController {

    async createBinderInspiration(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let client = await BinderInspiration.create({userId: id})
        return res.json(client)
    }

    async getInspiration(req, res, next) {
        let {id} = req.params
        let info = await BinderInspiration.findOne({where:{userId: id}})
        if(info == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        let generate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(generate)
    }
}

module.exports = new InspirationController()