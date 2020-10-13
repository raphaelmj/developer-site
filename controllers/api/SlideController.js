const Slide = require("../../models/index").Slide
const {
    map
} = require('p-iteration');
const sequelize = require('../../config/sequelize')
const Sequelize = require('sequelize')
const SlideRepository = require('../../repositories/SlideRepository')

class SlideController {

    getSlides(req, res) {
        Slide.findAll({
            order: [
                ['ordering', 'ASC']
            ]
        }).then(arts => {
            return res.json(arts)
        })
    }


    updateSlide(req, res) {
        Slide.update(
            { image: req.slideImage },
            { where: { id: req.body.id } }
        )
            .then(s => {
                return res.json(s)
            })
    }

    updateField(req, res) {
        SlideRepository.updateField(req.body.value, req.body.field, req.body.id).then(slide => {
            return res.json(slide)
        })
    }

    updateSlidesOrder(req, res) {
        SlideRepository.updateSlideOrder(req.body.slides).then(ss => {
            return res.json(ss)
        })
    }


    addSlide(req, res) {
        req.body.slide.image = req.slideImage
        SlideRepository.addSlide(req.body.slide).then(s => {
            return res.json(s)
        })
    }

    removeSlide(req, res) {
        Slide.destroy({
            where: {
                id: req.params.id
            }
        }).then(r => {
            return res.json(r)
        })
    }

}

module.exports = new SlideController()