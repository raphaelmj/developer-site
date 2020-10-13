const Invest = require("../models/index").Invest
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

class InvestRepository {

    async createInvest(invest, slug, bool) {

        var max = await this.findMaxOrdering()
        invest.ordering = max + 1

        try {
            var inv = await Invest.create(invest)
        } catch (error) {
            // console.log(error)
        }

        if (bool) {
            inv.slug = slug + '-' + inv.id
            await inv.save()
        }
        return inv
    }

    async findMaxOrdering() {
        var inv = await Invest.findOne({
            order: [
                ['ordering', 'DESC']
            ]
        })
        return inv.ordering
    }

    async orderChange(invests) {

        await map(invests, async (inv, i) => {
            await Invest.update({ ordering: (i + 1) }, { where: { id: inv.id } })
        })

        return await Invest.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        })

    }

    async updateField(value, field, id) {
        var inv = await Invest.findOne({ where: { id } })
        inv[field] = value
        await inv.save()
        return await Invest.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        })
    }

}

module.exports = new InvestRepository()