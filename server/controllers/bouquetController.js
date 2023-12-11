const {Bouquet, BinderBouquet, User, Composition, BouquetCategory, Orders, Flowers} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class BouquetController {
    async createBouquet(req, res, next) {
        try {
            let {id} = req.params
            let {name,price,id_category} = req.body

            let info = await BinderBouquet.findOne({where:{userId: id}})
            if(info == null) {
                return next(ApiError.badRequest('Пользователя не существует'))
            }

            let namebouquet = await Bouquet.findOne({where:{name, binderbouquetId:info.id, boleanOrder:true}})
        
            if(namebouquet !== null)
            {
                return next(ApiError.badRequest('Букет c таким названием присутсвует в базе'))
            }
            const bouquet = await Bouquet.create({img: req.file.path, name, price, binderbouquetId:info.id, id_category, boleanOrder:true})
            return res.json(bouquet)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async createAuthorBouquetforClient(req, res, next) {
        try {
            let {id} = req.params
            let {name,price,id_category,img} = req.body

            let info = await BinderBouquet.findOne({where:{userId: id}})
            if(info == null) {
                return next(ApiError.badRequest('Пользователя не существует'))
            }

            let namebouquet = await Bouquet.findOne({where:{name, binderbouquetId:info.id, boleanOrder:true, id_category}})
        
            if(namebouquet !== null)
            {
                return next(ApiError.badRequest('Букет c таким названием присутсвует в базе'))
            }
            const bouquet = await Bouquet.create({img: img, name, price, binderbouquetId:info.id, id_category, boleanOrder:true})
            return res.json(bouquet)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getBouquet(req, res) {
        let {id, id_category} = req.params
        let info = await BinderBouquet.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let idclient = info.id
        let client = await Bouquet.findAll({where:{binderbouquetId: idclient, id_category, boleanOrder:true}})
        return res.json(client)
    }

    async createBinderBouquet(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let data =  await BinderBouquet.findOne({where:{userId: id}})
        if(data !== null) {
            return res.status(401).json({message:"Нельзя добавить"})
        }
        let client = await BinderBouquet.create({userId: id})
        return res.json(client)
    }

    async deleteBouquet(req, res) {
        try {
            let id_categorybouquet = await BouquetCategory.findOne({where:{bouquetId: req.params.id}})
            await Composition.destroy({
                where:{
                    bouquetcategoryId: id_categorybouquet.id
                }
            });
            await BouquetCategory.destroy({
                where:{
                    bouquetId: req.params.id
                }
            });
            await Bouquet.destroy({
                where:{
                    id: req.params.id
                }
            });
            //return res.json()
        } catch (error) {
            console.log(error.message);
        }
    }

    async updatedeleteBouquet(req, res, next) {
        let {id} = req.params
        
        let getbouquet = await BouquetCategory.findOne({where:{bouquetId:id}})

        let getorder =  await Orders.findOne({where:{bouquetcategoryId:getbouquet.id}})

        if (getorder !== null)
        {
            return next(ApiError.badRequest('Букет нельзя удалить, так как он используется в заказе'))
        }
        else{
            let composition = await Composition.findAll({where:{bouquetcategoryId: getbouquet.id}})
            for(const item of composition){
                let flowerget = await Flowers.findOne({where:{id:item.flowerId}})
                let flowerupdate = await Flowers.update({quantity:flowerget.quantity + item.qty}, {where: {id:flowerget.id}})
            }
        }
        
        let updatebouquet = await Bouquet.update({boleanOrder:false}, {where:{id}})
      

        return res.json(updatebouquet)
        
    }

    async getSearchBouquet(req, res, next) {
        let {name, id} = req.params
        let info = await BinderBouquet.findOne({where:{userId: id}})
        if(info == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        let data = await Bouquet.findOne({where:{name, binderbouquetId:info.id, boleanOrder:true}})
        if(data == null) {
            return next(ApiError.badRequest('Букета не существует'))
        }
        return res.json(data)
    }

    async getSearchBouquetCategories(req, res, next) {
        let {name, id} = req.params
        let info = await BinderBouquet.findOne({where:{userId: id}})
        if(info == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        let data = await Bouquet.findOne({where:{name, binderbouquetId:info.id, boleanOrder:true, id_category: 2}})
        if(data == null) {
            return next(ApiError.badRequest('Букета не существует'))
        }
        return res.json(data)
    }

    async getOneBouquet(req, res) {
        let {id,idbouquet} = req.params
        let info = await BinderBouquet.findOne({where:{userId: id}})
        let category = await Bouquet.findOne({where:{id: idbouquet, binderbouquetId:info.id}})
        return res.json(category)
    }
}

module.exports = new BouquetController()