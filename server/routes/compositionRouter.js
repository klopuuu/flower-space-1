const Router = require('express')
const router = new Router()
const CompositionController = require('../controllers/compositionController')

router.post('/createcomposition/:id', CompositionController.createComposition)
router.post('/:id', CompositionController.createBinderComposition)
router.get('/getcomposition/:id/:compositionId', CompositionController.getComposition)
router.get('/getcompositionwhere/:idbouqet')

module.exports = router