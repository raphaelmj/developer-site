const router = require('express').Router();
const RouteParseRepository = require('./repositories/RouteParseRepository');
const HomeController = require('./controllers/HomeController');
const PageController = require('./controllers/PageController');
const InvestController = require("./controllers/api/InvestController")

// router.get('/sitemap.xml', function (req, res) {

//     fs.readFile('./sitemap.xml', function (err, data) {
//         res.type('application/xml');
//         return res.send(data)
//     });

// });

router.get('/admin', (req, res) => {
    return res.render('ngadmin')
})

router.get('/web/get/invest/:id', InvestController.getInvestWeb)
router.get('/', RouteParseRepository.homePageParse, HomeController.index)
// router.get('/kontakt', RouteParseRepository.contactGetData, PageController.showContact)
router.get('/wynajem', RouteParseRepository.commerceGetData, PageController.showCommarce)
router.get('/:investAlias', RouteParseRepository.parseUrl, PageController.investView)


module.exports = router;