'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //FIXME: is ok? the tbl is relational
      //Review.belongsTo(models.OrderProduct);
      //Review.hasOne(models.OrderProduct);
      //FIXME:
      Review.belongsToMany(models.Order, {
        through: models.OrderProduct,
      });
      Review.belongsTo(models.OrderProduct);
    }
  }
  Review.init(
    {
      title: DataTypes.STRING,
      comment: DataTypes.STRING,
      OrdersProductsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );
  return Review;
};
