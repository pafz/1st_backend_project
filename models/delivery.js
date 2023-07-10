'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      Delivery.belongsTo(models.Order);
    }
  }
  Delivery.init(
    {
      type: DataTypes.STRING,
      price: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Delivery',
    }
  );
  return Delivery;
};
