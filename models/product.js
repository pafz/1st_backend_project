'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.OrderProduct,
      });
      Product.belongsTo(models.Category);
      Product.hasMany(models.Review);
      Product.belongsTo(models.Company);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      favorite: DataTypes.STRING,
      price: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
