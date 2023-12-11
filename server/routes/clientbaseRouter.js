const Router = require('express')
const router = new Router()
const ClientBaseController = require('../controllers/clientbaseController')

router.post('/client/:id', ClientBaseController.createClient)
router.get('/getclient/:id', ClientBaseController.getClient)
router.post('/:id', ClientBaseController.createBinderClient)
router.delete('/:id', ClientBaseController.deleteClient)
router.get('/getoneclient/:id', ClientBaseController.getClientOne)
router.patch('/:id', ClientBaseController.update)
router.get('/searchclient/:phonenumber', ClientBaseController.getSearchClient)
module.exports = router