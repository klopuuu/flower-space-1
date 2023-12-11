const {User, BinderOrders, Orders, BouquetCategory, ClientBase, Bouquet} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class OrdersController {
    async createOrder(req, res, next) {
        try {
            let {id} = req.params
            let {adddescription, dateOFcreation, dateField, price, addres, clientbaseId, bouquetcategoryId, receivingId, statusorderId} = req.body

            let info = await BinderOrders.findOne({where:{userId: id}})

            if(info == null) {
                return next(ApiError.badRequest('Пользователя не существует'))
            }

            let idbouquets_category = await BouquetCategory.findOne({where:{bouquetId: bouquetcategoryId}})
            const order = await Orders.create({adddescription, dateOFcreation, dateField, price, addres, clientbaseId, bouquetcategoryId: idbouquets_category.id, receivingId, statusorderId, binderorderId:info.id, boleanOrder: true})
            let updatebouquet = await Bouquet.update({boleanOrder:false}, {where:{id: bouquetcategoryId}})
            return res.json(order)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getOrder(req, res) {
        let {id, boleanOrder} = req.params
        let info = await BinderOrders.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let idorder = info.id
        let orders = await Orders.findAll({where:{binderorderId: idorder, boleanOrder}})
        return res.json(orders)
    }

    async createBinderOrder(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let data = await BinderOrders.findOne({where:{userId: id}})
        if(data !== null) {
            return res.status(401).json({message:"Нельзя добавить"})
        }
        let order = await BinderOrders.create({userId: id})
        return res.json(order)
    }

    async getOneOrder(req, res) {
        let {id,idorder} = req.params
        let info = await BinderOrders.findOne({where:{userId: id}})
        let category = await Orders.findOne({where:{id: idorder, binderorderId:info.id}})
        return res.json(category)
    }

    async getAllOrderWhere(req, res, next) {
        let {id, telephone} = req.params
        let info = await BinderOrders.findOne({where:{userId: id}})
        let number =  await ClientBase.findOne({where:{binderclientbaseId: info.id, phonenumber: telephone}})
        if(number == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        let orders = await Orders.findAll({where:{clientbaseId: number.id, binderorderId:info.id, boleanOrder:true}})
        return res.json(orders)
    }

    async updateOrder(req, res) {
        let {statusorderId} = req.body
        try{
            if(statusorderId === 1 || statusorderId === 4)
            {
                await Orders.update(req.body, {where:{
                    id: req.params.id
                }})
                let info = await Orders.findOne({where:{id: req.params.id}})
                return res.json(info)
            }
            else{
                await Orders.update(req.body, {where:{
                    id: req.params.id
                }})

                await Orders.update({boleanOrder:false}, {where:{
                    id: req.params.id
                }})

                let info = await Orders.findOne({where:{id: req.params.id}})

                return res.json(info)
            }
        }
        catch(error){
            console.log(error.message)
        }
    }
}

module.exports = new OrdersController()