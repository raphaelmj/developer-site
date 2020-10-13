const cache = require('../config/cache');
var ParseHelper = require('../helpers/parse-helper');
const fs = require('fs')
const parser = new ParseHelper()

class PageController {


    investView(req, res) {
        // return res.json(req.viewData)
        if (!req.viewData.invest) {
            return res.status(404)
                .render('404', {
                    invests: req.viewData.invests,
                });
        }
        return res.render('layouts/investycja', {
            invests: req.viewData.invests,
            invest: req.viewData.invest,
            articles: req.viewData.articles,
            plans: (req.viewData.hasPlans) ? req.viewData.plansDouble.plans : null,
            zones: (req.viewData.hasPlans) ? req.viewData.plansDouble.zones : null
        })
    }


    showContact(req, res) {
        return res.json(req.viewData)
    }

    showCommarce(req, res) {
        //return res.json(req.viewData)
        return res.render('layouts/komer', {
            contactMain: req.viewData.contactMain,
            otherContacts: req.viewData.otherContacts,
            invests: req.viewData.invests,
            articles: req.viewData.articles
        })
    }


}


module.exports = new PageController()