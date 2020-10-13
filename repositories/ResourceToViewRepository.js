var ParseHelper = require('../helpers/parse-helper');
const cache = require('../config/cache');
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const Invest = require('../models/index').Invest
const Point = require('../models/index').Point
const Article = require('../models/index').Article
const Slide = require('../models/index').Slide
const Contact = require('../models/index').Contact

class ResourceToViewRepository {

    async getContacts() {

        var data = await this.getStandardData()

        return data
    }

    async getCommerce() {

        var data = await this.getStandardData()
        data.contactMain = await Contact.findOne({
            where: {
                asFirst: true
            }
        })
        data.otherContacts = await Contact.findAll({
            where: {
                asFirst: {
                    [Op.not]: true
                }
            }
        })

        return data
    }

    async getStandardData() {
        var invests = await Invest.findAll({
            where: {
                isShow: true
            },
            order: [
                ['ordering', 'asc']
            ]
        })

        var articles = await Article.findAll()
        articles = this.articlesRefactorObject(articles)

        return {
            invests,
            articles
        }
    }

    async getHomePageData() {
        var invests = await Invest.findAll({
            where: {
                isShow: true
            },
            order: [
                ['ordering', 'asc']
            ]
        })
        var points = await Point.findAll({
            where: {
                isShow: true
            },
            order: [
                ['ordering', 'asc']
            ]
        })

        var articles = await Article.findAll()
        articles = this.articlesRefactorObject(articles)

        var slides = await Slide.findAll({
            where: {
                status: true
            },
            order: [
                ['ordering', 'ASC']
            ]
        })


        var groups = this.pointsGroupRefactor(points)

        return {
            invests,
            points,
            articles,
            slides,
            groups
        }
    }


    pointsGroupRefactor(points) {

        var groups = {
            open: [],
            plan: []
        }

        points.forEach(p => {

            switch (p.type) {
                case 'single':

                    if (p.child.status == 'plan-invest') {
                        groups.plan.push(p.child)
                    }

                    if (p.child.status == 'open-invest') {
                        groups.open.push(p.child)
                    }

                    break;

                case 'collection':

                    p.childs.forEach(ch => {

                        if (ch.status == 'plan-invest') {
                            groups.plan.push(ch)
                        }

                        if (ch.status == 'open-invest') {
                            groups.open.push(ch)
                        }

                    });

                    break
            }

        });


        return groups
    }


    async pageData(salias) {

        var data = await this.getStandardData()


        data.invest = await Invest.findOne({
            where: {
                slug: salias,
                isShow: true
            }
        })

        data.hasPlans = false
        if (data.invest) {
            if (data.invest.plans) {
                if (data.invest.plans != '') {
                    if (data.invest.plans.length > 0) {
                        data.plansDouble = ResourceToViewRepository.refactorPlansZone(data.invest.plans)
                        data.hasPlans = true
                    }
                }
            }
        }

        return data
    }


    static refactorPlansZone(plans) {
        var ps = []
        var zs = []
        plans.map((p, i) => {
            if (p.isAsZone) {
                zs.push(p)
            } else {
                ps.push(p)
            }
        })
        return {
            plans: ps,
            zones: zs
        }
    }


    articlesRefactorObject(articles) {

        var arts = {}

        articles.forEach(ar => {

            arts[ar.alias] = ar

        })


        return arts

    }

}

module.exports = new ResourceToViewRepository()