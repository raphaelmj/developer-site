const sequelize = require('../config/sequelize')
const DataTypes = require('sequelize').DataTypes;

const Contact = sequelize.define('contact', {
    name: DataTypes.STRING,
    who: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    asFirst: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ordering: DataTypes.INTEGER
}, {});

module.exports = Contact