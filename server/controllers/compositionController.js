const {User, BinderComposition, Composition, BouquetCategory, Flowers} = require('../models/models')

class CompositionController {
    async createComposition(req, res, next) {
        let {id} = req.params
        
        const {qty, bouquetcategoryId, flowerId, price} = req.body

        let info = await BinderComposition.findOne({where:{userId: id}})
            
        if(info === null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
            
        let id_flower = await Flowers.findOne({where:{id: flowerId}})
            
        if(id_flower === null)
        {
            return next(ApiError.badRequest('Цветок не занесен в базу данных'))
        }

        let id_bouquet = await BouquetCategory.findOne({where:{id: bouquetcategoryId}})
            
        if(id_bouquet === null)
        {
            return next(ApiError.badRequest('Букет не занесен в базу данных'))
        }
            
        const createbouquet = await Composition.create({bindercompositionId: info.id, qty, bouquetcategoryId, flowerId, price})
        return res.json(createbouquet)
        return res.json(bouquetcategoryId)
    }

    async createBinderComposition(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let data =  await BinderComposition.findOne({where:{userId: id}})
        if(data !== null) {
            return res.status(401).json({message:"Нельзя добавить"})
        }
        let client = await BinderComposition.create({userId: id})
        return res.json(client)
    }

    async getComposition(req, res) {
        let {id, compositionId} = req.params
        let info = await BinderComposition.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let bouquet = await BouquetCategory.findOne({where:{bouquetId:compositionId}})
        let composition = await Composition.findAll({where:{bindercompositionId: info.id, bouquetcategoryId: bouquet.id}})
        return res.json(composition)
    }

}

module.exports = new CompositionController()