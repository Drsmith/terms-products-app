const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  articleNo: DataTypes.STRING,
  productName: DataTypes.STRING,
  inPrice: DataTypes.INTEGER,
  price: DataTypes.INTEGER,
  unit: DataTypes.STRING,
  inStock: DataTypes.INTEGER,
  description: DataTypes.STRING,
});

module.exports = Product;
