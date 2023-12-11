const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')//этот модуль необхожим для генерации jwt токена
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, name) => {
    return jwt.sign(
        {id, email, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, name, surname, age, workexperience, address, number} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, name, password: hashPassword, surname, age, workexperience, address, number})

        const token = generateJwt(user.id, user.email, user.name)
        return res.json({token})
    }

    async login(req, res, next) {
      const {email, password} = req.body
      const user = await User.findOne({where: {email}})
      if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword)
      {
        return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(user.id, user.email, user.name)
      return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name)
        return res.json({token})
    }

    
    async getAll(req, res) {
        let {id} = req.params
        let info = await User.findOne({where:{id}})
        return res.json(info)
    }

    async update(req, res) {
        try{
            await User.update(req.body, {where:{
                id: req.params.id
            }})
            res.status(200).json({msg:"USER"})
        }
        catch(error){
            console.log(error.message)
        }
    }
}

module.exports = new UserController()