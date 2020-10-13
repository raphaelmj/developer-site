const Invest = require("../../models/index").Invest
const Point = require("../../models/index").Point
const {
    map
} = require('p-iteration');
const sequelize = require('../../config/sequelize')
const Sequelize = require('sequelize')

class PointController {

    getPoints(req, res) {
        Point.findAll({
            order: [
                ['ordering', 'DESC']
            ]
        }).then(r => {
            return res.json(r)
        })
    }

    getPoint(req, res) {
        Point.findOne({
            where: {
                id: req.params.id
            }
        }).then(r => {
            return res.json(r)
        })
    }

    getPointsWithInvests(req, res) {
        Point.findAll({
            order: [
                ['ordering', 'DESC']
            ]
        }).then(r => {
            return res.json(r)
        })
    }


    createPoint(req, res) {
        Point.create(req.body).then(p => {
            Point.findAll({
                order: [
                    ['ordering', 'DESC']
                ]
            }).then(r2 => {
                // console.log(r2[0].childs[0].status)
                return res.json(r2)
            })
        })
    }

    updatePoint(req, res) {
        var body = req.body
        // console.log(body.childs)
        Point.update(body, {
            where: {
                id: body.id
            }
        }).then(r1 => {
            // return res.json(body)
            Point.findAll({
                order: [
                    ['ordering', 'DESC']
                ]
            }).then(r2 => {
                // console.log(r2[0].childs[0].status)
                return res.json(r2)
            })
        })

    }

    deletePoint(req, res) {
        Point.destroy({ where: { id: req.params.id } }).then(r => {
            return res.json(r)
        })
    }

}

module.exports = new PointController()