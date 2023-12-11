const Router = require('express')
const router = new Router()
const ReceivingController = require('../controllers/receivingController')

router.post('/createreceiving', ReceivingController.postReceiving)
router.get('/getreceiving', ReceivingController.getReceiving)
router.get('/getonereceiving/:name', ReceivingController.getOneReceiving)

module.exports = router