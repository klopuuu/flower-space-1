const Router = require('express')
const router = new Router()
const InspirationController = require('../controllers/inspirationController')
const request = require('request');
const {User, BinderInspiration, Inspiration} = require('../models/models')
const ApiError = require('../error/ApiError')

router.post('/binderinspiration/:id', InspirationController.createBinderInspiration)
router.post('/generate/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let idgenerate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    if (idgenerate !== null){
        await Inspiration.destroy({
            where:{
                binderinspirationId: info.id
            }
        });
    }
    request({url:'http://127.0.0.1:8001/generate', json:true}, async function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        for (const item of body){
            await Inspiration.create({binderinspirationId:info.id, img:item})
        }    
        let idgenerate1 = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(idgenerate1)    
      });   
      
    
})
router.post('/generate/rose/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let idgenerate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    if (idgenerate !== null){
        await Inspiration.destroy({
            where:{
                binderinspirationId: info.id
            }
        });
    }
    request({url:'http://127.0.0.1:8001/generate/rose', json:true}, async function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        for (const item of body){
            await Inspiration.create({binderinspirationId:info.id, img:item})
        }    
        let idgenerate1 = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(idgenerate1)    
      });   
      
    
})

router.post('/generate/peonies/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let idgenerate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    if (idgenerate !== null){
        await Inspiration.destroy({
            where:{
                binderinspirationId: info.id
            }
        });
    }
    request({url:'http://127.0.0.1:8001/generate/peonies', json:true}, async function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        for (const item of body){
            await Inspiration.create({binderinspirationId:info.id, img:item})
        }    
        let idgenerate1 = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(idgenerate1)    
      });   
      
    
})
router.post('/generate/gipsophila/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let idgenerate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    if (idgenerate !== null){
        await Inspiration.destroy({
            where:{
                binderinspirationId: info.id
            }
        });
    }
    request({url:'http://127.0.0.1:8001/generate/gipsophila', json:true}, async function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        for (const item of body){
            await Inspiration.create({binderinspirationId:info.id, img:item})
        }    
        let idgenerate1 = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(idgenerate1)    
      });   
      
    
})
router.post('/generate/chrysant/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let idgenerate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    if (idgenerate !== null){
        await Inspiration.destroy({
            where:{
                binderinspirationId: info.id
            }
        });
    }
    request({url:'http://127.0.0.1:8001/generate/chrysant', json:true}, async function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        for (const item of body){
            await Inspiration.create({binderinspirationId:info.id, img:item})
        }    
        let idgenerate1 = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(idgenerate1)    
      });   
      
    
})
router.post('/generate/chamomile/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let idgenerate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    if (idgenerate !== null){
        await Inspiration.destroy({
            where:{
                binderinspirationId: info.id
            }
        });
    }
    request({url:'http://127.0.0.1:8001/generate/chamomile', json:true}, async function (error, response, body) {
        console.error('error:', error); // Print the error
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the data received
        for (const item of body){
            await Inspiration.create({binderinspirationId:info.id, img:item})
        }    
        let idgenerate1 = await Inspiration.findAll({where:{binderinspirationId:info.id}})
        return res.json(idgenerate1)    
      });   
      
    
})
router.get('/getgenerate/:id', async function(req, res, next) {
    let {id} = req.params
    let info = await BinderInspiration.findOne({where:{userId: id}})
    if(info == null) {
        return next(ApiError.badRequest('Пользователя не существует'))
    }
    let generate = await Inspiration.findAll({where:{binderinspirationId:info.id}})
    return res.json(generate)
})

module.exports = router