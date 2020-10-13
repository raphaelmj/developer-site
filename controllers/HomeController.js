const cache = require('../config/cache');
var Article = require('../models/index').Article;
var Gallery = require('../models/index').Gallery;
var Category = require('../models/index').Category;
const fs = require('fs')
const ParseHelper = require('../helpers/parse-helper')

class HomeController {

    index(req, res) {

        // var poland = fs.readFileSync('./config/resources/map_poland.json')
        // var cities = fs.readFileSync('./config/resources/cities.json')
        // var groups = fs.readFileSync('./config/resources/poland_group.json')
        // poland = JSON.parse(poland)
        // cities = JSON.parse(cities)
        // groups = JSON.parse(groups)

        // return res.json(req.viewData)

        return res.render('layouts/layout', {
            invests: req.viewData.invests,
            poland: req.viewData.points,
            articles: req.viewData.articles,
            slides: req.viewData.slides,
            groups: req.viewData.groups
        })

    }




}


module.exports = new HomeController()