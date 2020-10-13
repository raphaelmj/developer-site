const Slide = require("../models/index").Slide
const {
    map
} = require('p-iteration');
const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

class SlideRepository {


    async updateField(value, field, id) {
        var s = await Slide.findOne({ where: { id } })
        s[field] = value
        await s.save()
        return s
    }

    async updateSlideOrder(slides) {
        await map(slides, async (s, i) => {
            await Slide.update({
                ordering: i + 1
            },
                { where: { id: s.id } })
        })
        return await Slide.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        })
    }

    async addSlide(slide) {


        var max = await this.findMaxOrdering()
        // console.log(slide)
        slide.ordering = max + 1
        try {
            var s = await Slide.create(slide)
        } catch (error) {
            console.log(error)
        }

        return s

    }

    async findMaxOrdering() {
        var s = await Slide.findOne({
            order: [
                ['ordering', 'DESC']
            ]
        })

        return s.ordering
    }


}

module.exports = new SlideRepository()