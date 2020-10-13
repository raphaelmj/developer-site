const Article = require("../../models/index").Article
const {
    map
} = require('p-iteration');
const sequelize = require('../../config/sequelize')
const Sequelize = require('sequelize')
const slug = require('slug')
const ValidateRepository = require('../../repositories/ValidateRepository')

class ArticleController {

    getArticles(req, res) {
        Article.findAll().then(arts => {
            return res.json(arts)
        })
    }

    getArticle(req, res) {
        Article.findOne({
            where: {
                id: req.params.id
            }
        }).then(art => {
            return res.json(art)
        })
    }


    updateArticle(req, res) {
        Article.update(req.body.data, {
            where: {
                id: req.body.id
            }
        }).then(r => {
            return res.json(r)
        })
    }

}

module.exports = new ArticleController()