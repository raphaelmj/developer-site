const sequelize = require('../config/sequelize')
const DataTypes = require('sequelize').DataTypes;

const Article = sequelize.define('article', {
    title: DataTypes.STRING,
    alias: {
        type: DataTypes.STRING,
        unique: true
    },
    contentType: {
        type: DataTypes.ENUM,
        values: ['double', 'single']
    },
    singleContent: DataTypes.TEXT,
    textLeft: DataTypes.TEXT,
    textRight: DataTypes.TEXT,
    customData: {
        type: DataTypes.TEXT,
        get() {
            if (this.getDataValue('customData')) {
                return JSON.parse(this.getDataValue('customData'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('customData', JSON.stringify(val))
            } else {
                this.setDataValue('customData', null)
            }
        }
    }
}, {});

module.exports = Article