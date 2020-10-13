const sequelize = require('../config/sequelize')
const DataTypes = require('sequelize').DataTypes;

const Slide = sequelize.define('slide', {
    image: DataTypes.STRING,
    ordering: DataTypes.INTEGER,
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {});

module.exports = Slide