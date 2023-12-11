const Router = require('express')
const router = new Router()
const ReceivingController = require('../controllers/pdfgenerateController')
const pdfgenerateController = require('../controllers/pdfgenerateController')

router.get('/generatepdf/:id', pdfgenerateController.createPdf)

module.exports = router