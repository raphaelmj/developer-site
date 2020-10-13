const Invest = require("../models/index").Invest
const Point = require("../models/index").Point
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

class PointRepository {

    async getFullPointData() {

        var pts = await Point.findAll({ order: [['ordering', 'DESC']] })
    }

    async updatePointLinkIfInvestChange(invId) {
        var invest = await Invest.findOne({ where: { id: invId } })
        var r = await this.searchPointsToChangeLink(invest)
        return r
    }


    async searchPointsToChangeLink(invest) {

        var points = await Point.findAll()
        var updatedPoints = []

        await map(points, async (p, i) => {

            var { nChilds, bool } = await this.findInvestInChild(p.childs, invest)
            if (bool) {
                await Point.update({ childs: nChilds }, { where: { id: p.id } })
                updatedPoints.push(p)
            }

        })

        return updatedPoints

    }

    findInvestInChild(childs, invest) {

        var nChilds = []
        var bool = false

        childs.forEach((ch, i) => {

            if (ch.investId == invest.id) {
                ch.url = invest.slug
                bool = true
            }

            nChilds.push(ch)

        })

        return {
            nChilds,
            bool
        }

    }

}

module.exports = new PointRepository()