const {Flowers, BinderFlowers, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class FlowersController {

    async createFlowers(req, res, next) {
        try {
            let {id} = req.params
            let {name, price, quantity} = req.body
            let info = await BinderFlowers.findOne({where:{userId: id}})
            if(info == null) {
                return next(ApiError.badRequest('Пользователя не существует'))
            }

            let nameflower = await Flowers.findOne({where:{name, binderflowerId:info.id}})
        
            if(nameflower !== null)
            {
                return next(ApiError.badRequest('Цветок присутствует в базе'))
            }
            const flower = await Flowers.create({img: req.file.path, name, price, binderflowerId:info.id, quantity})
            return res.json(flower)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getFlowers(req, res) {
        let {id} = req.params
        let info = await BinderFlowers.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let idclient = info.id
        let client = await Flowers.findAll({where:{binderflowerId: idclient}})
        return res.json(client)
    }

    async createBinderFlower(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let client = await BinderFlowers.create({userId: id})
        return res.json(client)
    }

    async update(req, res) {
        try{
            await Flowers.update(req.body, {where:{
                id: req.params.id
            }})
            let info = await Flowers.findOne({where:{id: req.params.id}})
            return res.json(info)
        }
        catch(error){
            console.log(error.message)
        }
    }

    async getFlowersOne(req, res) {
        let {id} = req.params
        let info = await Flowers.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Нет цветка"})
        }
        return res.json(info)
    }

    async getSearchFlowers(req, res) {
        let {name} = req.params
        let info = await Flowers.findOne({where:{name}})
        if(info == null) {
            return res.status(401).json({message:"Нет цветка"})
        }
        return res.json(info)
    }

    async deleteFlower(req, res) {
        try {
            await Flowers.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({msg: "Flower Deleted"});
        } catch (error) {
            console.log(error.message);
        }
    }

    async getSearchFilter(req, res, next) {
        let {id} = req.params
        let info = await BinderFlowers.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let idclient = info.id
        let flower = await Flowers.findAll({where:{binderflowerId: idclient}})
        const filteredFlowers = flower.filter(flower=>{
            return flower.quantity >= 0 && flower.quantity <= 13
        })
        return res.json(filteredFlowers)
    }
}

module.exports = new FlowersController()