const Router = require('express')
const router = new Router()
const BouquetController = require('../controllers/bouquetController')
const fileMiddleware = require('../middleware/fileflowers')

router.post('/createbouquet/:id', fileMiddleware.single('avatar'), BouquetController.createBouquet)
router.post('/createbouquetauthorforclient/:id', BouquetController.createAuthorBouquetforClient)
router.post('/:id', BouquetController.createBinderBouquet)
router.get('/:id/:id_category', BouquetController.getBouquet)
//router.delete('/:id', BouquetController.deleteBouquet)
router.patch('/:id', BouquetController.updatedeleteBouquet)
router.get('/searchbouquet/:name/:id', BouquetController.getSearchBouquet)
router.get('/searchbouquetcategories/:name/:id', BouquetController.getSearchBouquetCategories)
router.get('/getonebouquet/:id/:idbouquet', BouquetController.getOneBouquet)

module.exports = router