const {BouquetCategory, BouquetCategoryBinder, User, Bouquet, Category} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class BouquetCategoryController {
    async createCategoryBouquet(req, res, next) {
        try {
            let {id} = req.params

            let {id_bouquet, id_category} = req.body

            let info = await BouquetCategoryBinder.findOne({where:{userId: id}})

            if(info == null) {
                return next(ApiError.badRequest('Пользователя не существует'))
            }

            let bouquet = await Bouquet.findOne({where:{id:id_bouquet}})

            let category = await Category.findOne({where:{id:id_category}})

            if(bouquet == null || category == null)
            {
                return next(ApiError.badRequest('Букета или категории не существует в базе данных'))
            }
            
            let bouquet_id_category = await BouquetCategory.findOne({where:{bouquetId:id_bouquet}})

            if(bouquet_id_category !== null)
            {
                return next(ApiError.badRequest('Букет c такой категорией уже существует'))
            }

            let bouquetcategory = await BouquetCategory.create({bouquetbindercategoryId:info.id, bouquetId: id_bouquet, categoryId: id_category})
            
            return res.json(bouquetcategory)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getCategoryBouquet(req, res, next) {
        let {id,idcategory} = req.params
        let info = await BouquetCategoryBinder.findOne({where:{userId: id}})
        if(info == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        let category = await BouquetCategory.findAll({where:{categoryId: idcategory,bouquetbindercategoryId: info.id}})
        
        return res.json(category)
    }

    async createBinderCategoryBouquet(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let data =  await BouquetCategoryBinder.findOne({where:{userId: id}})
        if(data !== null) {
            return res.status(401).json({message:"Нельзя добавить"})
        }
        let category = await BouquetCategoryBinder.create({userId: id})
        return res.json(category)
    }

    async geOneCategoryBouquet(req, res) {
        let {id,iduser} = req.params
        let info = await BouquetCategoryBinder.findOne({where:{userId: id}})
        let category = await BouquetCategory.findOne({where:{bouquetbindercategoryId:info.id, id:iduser}})
        return res.json(category)
    }
}

module.exports = new BouquetCategoryController()