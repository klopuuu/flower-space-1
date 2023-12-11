const Router = require('express')
const router = new Router()
const FlowersController = require('../controllers/flowersController')
const fileMiddleware = require('../middleware/fileflowers')

router.post('/createflowers/:id', fileMiddleware.single('avatar'), FlowersController.createFlowers)
router.get('/:id', FlowersController.getFlowers)
router.post('/:id', FlowersController.createBinderFlower)
router.get('/getoneflowers/:id', FlowersController.getFlowersOne)
router.patch('/:id', FlowersController.update)
router.get('/searchflowers/:name', FlowersController.getSearchFlowers)
router.delete('/:id',FlowersController.deleteFlower)
router.get('/searchfilter/:id', FlowersController.getSearchFilter)

module.exports = router 