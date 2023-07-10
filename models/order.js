'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
      });
      Order.hasOne(models.Delivery);
    }
  }
  Order.init(
    {
      payment: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
