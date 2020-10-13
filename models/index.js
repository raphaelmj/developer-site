const sequelize = require('../config/sequelize')
const User = require('./user')
const Point = require('./point')
const Invest = require('./invest')
const Contact = require('./contact')
const Article = require('./article')
const Slide = require('./slide')


module.exports = {
    User,
    Point,
    Invest,
    Contact,
    Article,
    Slide
}