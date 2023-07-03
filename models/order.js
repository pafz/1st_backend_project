'use strict';
//TODO: require or heredity?   https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //TODO: change?
      Order.belongsTo(models.Order);
      // Order.belongsToMany(Product, { through: Order_Product });
      // Product.belongsToMany(Order, { through: Order_Product });
    }
  }
  Order.init(
    {
      payment: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      delivery_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
