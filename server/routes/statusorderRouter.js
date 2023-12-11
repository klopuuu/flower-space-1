const Router = require('express')
const router = new Router()
const StatusOrderController = require('../controllers/statusorderController')

router.post('/createstatusotder', StatusOrderController.postStatus)
router.get('/getstatusorder', StatusOrderController.getStatus)
router.get('/getonestatus/:name', StatusOrderController.getOneStatus)
router.get('/getonestatusid/:id', StatusOrderController.getOneStatusId)

module.exports = router