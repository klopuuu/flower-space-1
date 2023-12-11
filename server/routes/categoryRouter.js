const Router = require('express')
const router = new Router()
const CategoryController = require('../controllers/categoriesController')

router.post('/createcategory', CategoryController.postCategory)
router.get('/getcategory', CategoryController.getCategory)

module.exports = router