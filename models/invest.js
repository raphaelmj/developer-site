const sequelize = require('../config/sequelize')
const DataTypes = require('sequelize').DataTypes;

const Invest = sequelize.define('invest', {
    mainName: DataTypes.STRING,
    projectName: DataTypes.STRING,
    slug: {
        type: DataTypes.STRING,
        unique: true
    },
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    areaSize: DataTypes.STRING,
    parkingAreaSize: DataTypes.STRING,
    rentiers: DataTypes.TEXT,
    textLeft: DataTypes.TEXT,
    textRight: DataTypes.TEXT,
    headerImage: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('headerImage')) {
                return JSON.parse(this.getDataValue('headerImage'));
            } else {
                return null
            }
        },
        set(val) {
            this.setDataValue('headerImage', JSON.stringify(val))
        }
    },
    horizontImage: DataTypes.STRING,
    map: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('map')) {
                return JSON.parse(this.getDataValue('map'));
            } else {
                return null
            }
        },
        set(val) {
            this.setDataValue('map', JSON.stringify(val))
        }
    },
    logo: DataTypes.STRING,
    lat: DataTypes.DECIMAL(6, 2),
    lng: DataTypes.DECIMAL(6, 2),
    siteLink: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('siteLink')) {
                return JSON.parse(this.getDataValue('siteLink'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('siteLink', JSON.stringify(val))
            } else {
                this.setDataValue('siteLink', null)
            }
        }
    },
    openDate: DataTypes.STRING,
    remodeling: DataTypes.STRING,
    buyDate: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM,
        values: ['plan-invest', 'open-invest']
    },
    movie: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('movie')) {
                return JSON.parse(this.getDataValue('movie'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('movie', JSON.stringify(val))
            } else {
                this.setDataValue('movie', null)
            }
        }
    },
    gallery: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('gallery')) {
                return JSON.parse(this.getDataValue('gallery'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('gallery', JSON.stringify(val))
            } else {
                this.setDataValue('gallery', null)
            }
        }
    },
    plans: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('plans')) {
                return JSON.parse(this.getDataValue('plans'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('plans', JSON.stringify(val))
            } else {
                this.setDataValue('plans', null)
            }
        }
    },
    contacts: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('contacts')) {
                return JSON.parse(this.getDataValue('contacts'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('contacts', JSON.stringify(val))
            } else {
                this.setDataValue('contacts', null)
            }
        }
    },
    rentiersContacts: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('rentiersContacts')) {
                return JSON.parse(this.getDataValue('rentiersContacts'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('rentiersContacts', JSON.stringify(val))
            } else {
                this.setDataValue('rentiersContacts', null)
            }
        }
    },
    managementContacts: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('managementContacts')) {
                return JSON.parse(this.getDataValue('managementContacts'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('managementContacts', JSON.stringify(val))
            } else {
                this.setDataValue('managementContacts', null)
            }
        }
    },
    zone: {
        type: DataTypes.TEXT,
        get() {

            if (this.getDataValue('zone')) {
                return JSON.parse(this.getDataValue('zone'));
            } else {
                return null
            }
        },
        set(val) {
            if (typeof val == 'object') {
                this.setDataValue('zone', JSON.stringify(val))
            } else {
                this.setDataValue('zone', null)
            }
        }
    },
    ordering: DataTypes.INTEGER,
    isShow: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    metaKeywords: DataTypes.TEXT,
    metaDescription: DataTypes.TEXT
}, {});

module.exports = Invest