const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Terms = sequelize.define('Terms', {
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Terms;
