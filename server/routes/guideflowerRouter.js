const Router = require('express')
const router = new Router()
const GuidController = require('../controllers/guideflowerController')
const fileMiddleware = require('../middleware/fileflowers')

router.post('/createguide', fileMiddleware.single('avatar'), GuidController.postGuideFlower)
router.get('/getguide', GuidController.getGuideFlower)
router.get('/searchguid/search', GuidController.getSearchGuid)
// router.patch('/:id', GuidController.updateGuideFlower)

module.exports = router