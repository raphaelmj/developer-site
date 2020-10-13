const sequelize = require('../config/sequelize')
const DataTypes = require('sequelize').DataTypes;

const Point = sequelize.define('point', {
  name: DataTypes.STRING,
  left: DataTypes.STRING,
  top: DataTypes.STRING,
  cityLeft: DataTypes.STRING,
  cityTop: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM,
    values: ['plan-invest', 'open-invest']
  },
  type: {
    type: DataTypes.ENUM,
    values: ['single', 'collection'],
    defaultValue: 'collection'
  },
  size: {
    type: DataTypes.ENUM,
    values: ['big', 'small']
  },
  child: {
    type: DataTypes.TEXT,
    get() {

      if (this.getDataValue('child')) {
        return JSON.parse(this.getDataValue('child'));
      } else {
        return null
      }
    },
    set(val) {
      this.setDataValue('child', JSON.stringify(val))
    }
  },
  childs: {
    type: DataTypes.TEXT,
    get() {

      if (this.getDataValue('childs')) {
        return JSON.parse(this.getDataValue('childs'));
      } else {
        return null
      }
    },
    set(val) {
      this.setDataValue('childs', JSON.stringify(val))
    }
  },
  isShow: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ordering: DataTypes.INTEGER,
}, {});

module.exports = Point