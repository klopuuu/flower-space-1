const Router = require('express')
const router = new Router()
const OrdersController = require('../controllers/ordersController')

router.post('/createorders/:id', OrdersController.createOrder)
router.get('/getorders/:id/:boleanOrder', OrdersController.getOrder)
router.post('/createbinderorders/:id', OrdersController.createBinderOrder)
router.get('/getoneorders/:id/:idorder', OrdersController.getOneOrder)
router.get('/getallorderswhere/:id/:telephone', OrdersController.getAllOrderWhere)
router.patch('/:id', OrdersController.updateOrder)

module.exports = router