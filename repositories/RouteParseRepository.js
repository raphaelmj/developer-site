var ParseHelper = require('../helpers/parse-helper');
var ResourceToViewRepository = require('./ResourceToViewRepository');
const cache = require('../config/cache');
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const Invest = require('../models/index').Invest
const Point = require('../models/index').Point

class RouteParseRepository {

    contactGetData(req, res, next) {
        ResourceToViewRepository.getContacts().then(d => {
            req.viewData = d
            next();
        })
    }

    commerceGetData(req, res, next) {
        ResourceToViewRepository.getCommerce().then(d => {
            req.viewData = d
            next();
        })
    }

    poliGetData(req, res, next) {
        ResourceToViewRepository.getStandardData().then(d => {
            req.viewData = d
            next();
        })
    }

    parseUrl(req, res, next) {


        ResourceToViewRepository.pageData(req.params.investAlias).then(d => {

            if (!d) {
                return res.status(404)
                    .render('404', {
                        invests: d.invests
                    });
            }


            req.viewData = d
            next();
        })

    }

    homePageParse(req, res, next) {
        ResourceToViewRepository.getHomePageData().then(d => {
            req.viewData = d
            next();
        })
    }


}

module.exports = new RouteParseRepository();