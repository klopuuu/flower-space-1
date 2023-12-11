const Router = require('express')
const router = new Router()
const BouquetCategoryController = require('../controllers/bouquentcategoriesController')

router.post('/createbouquetcategory/:id', BouquetCategoryController.createCategoryBouquet)
router.get('/:id/:idcategory', BouquetCategoryController.getCategoryBouquet)
router.post('/createbouquetbindercategory/:id', BouquetCategoryController.createBinderCategoryBouquet)
router.get('/getonecategory/:id/:iduser', BouquetCategoryController.geOneCategoryBouquet)

module.exports = router