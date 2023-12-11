const Router = require('express')
const router = new Router()
const HistoryOrdersController = require('../controllers/historyorderController')

router.get('/historyorders', HistoryOrdersController.getHistoryOrder)

module.exports = router