const Invest = require("../../models/index").Invest
const {
    map
} = require('p-iteration');
const sequelize = require('../../config/sequelize')
const Sequelize = require('sequelize')
const slug = require('slug')
const ValidateRepository = require('../../repositories/ValidateRepository')
const InvestRepository = require('../../repositories/InvestRepository')
const PointRepository = require('../../repositories/PointsRepository')

class InvestController {



    getInvests(req, res) {
        Invest.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        }).then(r => {
            return res.json(r)
        })
    }

    getInvest(req, res) {
        Invest.findOne({
            where: {
                id: req.params.id
            }
        }).then(r => {
            return res.json(r)
        })
    }


    getInvestWeb(req, res) {
        Invest.findOne({
            where: {
                id: req.params.id
            }
        }).then(r => {
            return res.json(r)
        })
    }


    updateInvest(req, res) {

        var invest = req.body.invest

        if (req.headerImage) {
            invest.headerImage = req.headerImage
        }
        if (req.horizontImage) {
            invest.horizontImage = req.horizontImage
        }
        if (req.map.image && req.map.imageBig && req.map.sizeString) {
            invest.map = req.map
        }

        var newInvest = Object.assign(invest, req.body.data)

        var slugData = slug(invest.mainName + ' ' + invest.city, {
            lower: true
        })

        ValidateRepository.checkIsAliasFreeExceptStatic(slugData, 'invest', invest.id).then(bool => {

            if (bool) {
                slugData += '-' + invest.id
            }
            invest.slug = slugData



            Invest.update(newInvest, {
                where: {
                    id: invest.id
                }
            }).then(r1 => {

                PointRepository.updatePointLinkIfInvestChange(invest.id).then(r2 => {
                    return res.json({
                        slugData,
                        data: req.body.data,
                        newInvest,
                        invest,
                        bool,
                        r1,
                        r2
                    })
                })

            })


        })


    }


    createInvest(req, res) {
        var invest = req.body.invest

        if (req.headerImage) {
            invest.headerImage = req.headerImage
        }
        if (req.horizontImage) {
            invest.horizontImage = req.horizontImage
        }
        if (req.map) {
            if (req.map.image && req.map.imageBig && req.map.sizeString) {
                invest.map = req.map
            }
        }

        var newInvest = Object.assign(invest, req.body.data)

        var slugData = slug(invest.mainName + ' ' + invest.city, {
            lower: true
        })

        ValidateRepository.checkIsAliasFreeStatic(slugData, 'invest').then(bool => {

            if (bool) {
                newInvest.slug = null
            } else {
                newInvest.slug = slugData
            }
            console.log(bool)
            // return res.json({ newInvest, bool, slugData })

            InvestRepository.createInvest(newInvest, slugData, bool).then(inv => {
                return res.json({
                    inv
                })
            })

            // return res.json({ slugData, data: req.body.data, newInvest, bool })


        })

        // return res.json({ slugData, data: req.body.data, newInvest, invest })
    }


    changeInvestOrder(req, res) {
        InvestRepository.orderChange(req.body.invests).then(invests => {
            return res.json(invests)
        })
    }

    updateField(req, res) {
        InvestRepository.updateField(req.body.value, req.body.field, req.body.id).then(invests => {
            return res.json(invests)
        })
    }

    deleteInvest(req, res) {
        Invest.destroy({
            where: {
                id: req.params.id
            }
        }).then(r => {
            Invest.findAll({
                order: [
                    ['ordering', 'ASC']
                ]
            }).then(invests => {
                return res.json(invests)
            })
        })
    }

}

module.exports = new InvestController()