const router = require('express').Router();
// const AuthController = require("./controllers/api/AuthController")
const InvestController = require("./controllers/api/InvestController")
const PointController = require("./controllers/api/PointController")
const ArticleController = require("./controllers/api/ArticleController")
const SlideController = require("./controllers/api/SlideController")
const ContactController = require("./controllers/api/ContactController")
const MediaRepository = require('./repositories/MediaRepository')
const UploadController = require('./controllers/api/UploadController')
const authmiddleware = require("./middlewares/admin/authmiddleware")

// router.post('/send/email', EmailController);

router.get('/get/invests', InvestController.getInvests)
router.get('/get/invest/:id', InvestController.getInvest)
var uploadSingle = MediaRepository.prepareFileSimpleUpload()
router.post('/upload/one/file', uploadSingle.single('file'), UploadController.uploadSimpleFileEnd)
var uploadGallery = MediaRepository.prepareImageStorageUpload();
router.post('/upload/gallery/images', MediaRepository.beforePrepareDataToGallery, uploadGallery.array('file'), MediaRepository.afterUplaodGallery)
router.post('/update/invest', MediaRepository.uploadHeaderImageIfExists, MediaRepository.uploadHorizontalImageIfExists, MediaRepository.uploadMapImageIfExists, InvestController.updateInvest)
router.post('/create/invest', MediaRepository.uploadHeaderImageIfExists, MediaRepository.uploadHorizontalImageIfExists, MediaRepository.uploadMapImageIfExists, InvestController.createInvest)
router.post('/change/invest/sort', InvestController.changeInvestOrder)
router.post('/update/invest/field', InvestController.updateField)
router.delete('/invest/delete/:id', InvestController.deleteInvest)

router.get('/get/points', PointController.getPoints)
router.get('/get/point/:id', PointController.getPoint)
router.delete('/remove/point/:id', PointController.deletePoint)
router.post('/create/point', PointController.createPoint)
router.post('/update/point', PointController.updatePoint)



router.get('/get/articles', ArticleController.getArticles)
router.get('/get/article/:id', ArticleController.getArticle)
router.post('/update/article', ArticleController.updateArticle)

router.get('/get/slides', SlideController.getSlides)
router.post('/update/slide', MediaRepository.uploadSlideIfExists, SlideController.updateSlide)
router.post('/update/slide/field', SlideController.updateField)
router.post('/update/slides/order', SlideController.updateSlidesOrder)
router.post('/add/slide', MediaRepository.uploadSlideIfExists, SlideController.addSlide)
router.delete('/remove/slide/:id', SlideController.removeSlide)

router.get('/get/contacts', ContactController.getContacts)
router.get('/get/contact/:id', ContactController.getContact)
router.post('/update/contact', ContactController.updateContact)
router.post('/create/contact', ContactController.createContact)
router.post('/update/contact/field', ContactController.updateContactField)
router.post('/update/contacts/order', ContactController.updateOrder)
router.delete('/remove/contact/:id', ContactController.removeContact)

module.exports = router;