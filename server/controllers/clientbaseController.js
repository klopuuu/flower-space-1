const {User, BinderClientBase, ClientBase} = require('../models/models')
const ApiError = require('../error/ApiError')

class ClientBaseController {
    async createClient(req, res, next) {
        let {id} = req.params
        const {name, surname, phonenumber, address} = req.body
        let info = await BinderClientBase.findOne({where:{userId: id}})
        
        if(info == null) {
            return next(ApiError.badRequest('Пользователя не существует'))
        }
        
        let number = await ClientBase.findOne({where:{phonenumber}})
        
        if(number !== null)
        {
            return next(ApiError.badRequest('Номер клиента уже есть в базе'))
        }
        
        const createuser = await ClientBase.create({binderclientbaseId: info.id, name, surname, phonenumber, address})
        return res.json(createuser)
    }

    async getClient(req, res) {
        let {id} = req.params
        let info = await BinderClientBase.findOne({where:{userId: id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let idclient = info.id
        let client = await ClientBase.findAll({where:{binderclientbaseId: idclient}})
        return res.json(client)
    }

    async createBinderClient(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        if(info == null) {
            return res.status(401).json({message:"Не авторизован"})
        }
        let client = await BinderClientBase.create({userId: id})
        return res.json(client)
    }

    async deleteClient(req, res) {
        try {
            await ClientBase.destroy({
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({msg: "Client Deleted"});
        } catch (error) {
            console.log(error.message);
        }
    }

    async update(req, res) {
        try{
            await ClientBase.update(req.body, {where:{
                id: req.params.id
            }})
            let info = await ClientBase.findOne({where:{id: req.params.id}})
            return res.json(info)
        }
        catch(error){
            console.log(error.message)
        }
    }

    async getClientOne(req, res, next) {
        let {id} = req.params
        let info = await ClientBase.findOne({where:{id}})
        if(info == null) {
            return next(ApiError.badRequest('Клиента не существует'))
        }
        return res.json(info)
    }

    async getSearchClient(req, res,next) {
        let {phonenumber} = req.params
        let info = await ClientBase.findOne({where:{phonenumber}})
        if(info == null) {
            return next(ApiError.badRequest('Клиента не существует'))
        }
        return res.json(info)
    }
}

module.exports = new ClientBaseController()