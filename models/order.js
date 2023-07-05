'use strict';
//TODO: require or heredity?   https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        through: models.OrderProduct,
      });
    }
  }
  Order.init(
    {
      payment: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      delivery_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
