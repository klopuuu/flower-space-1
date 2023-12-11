const {GuideFlower,User} = require('../models/models')
const ApiError = require('../error/ApiError')
class GuideFlowerController {
    async postGuideFlower(req, res, next) {
        const {name, descripe, userId} = req.body
        const user = await User.findOne({where:{id:userId}})
        if(user == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        const guideflower = await GuideFlower.create({img: req.file.path, name, descripe, userId, nameuser: user.name})
        return res.json(guideflower)
    }

    async getGuideFlower(req, res) {
        const guideflower = await GuideFlower.findAll()
        return res.json(guideflower)
    }

    async getSearchGuid(req, res, next) {
        let info = await GuideFlower.findOne({where:{name:req.query.key}})
        if(info === null) {
            return next(ApiError.badRequest('Такой статьи нет'))
        }
        return res.json(info)
    }
}

module.exports = new GuideFlowerController()