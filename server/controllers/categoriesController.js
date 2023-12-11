const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
    async postCategory(req, res) {
        const {name} = req.body
        const namecategory = await Category.create({name})
        return res.json(namecategory)
    }

    async getCategory(req, res) {
        const category = await Category.findAll()
        return res.json(category)
    }
}

module.exports = new CategoryController()