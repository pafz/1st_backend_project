'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Product);
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      place: DataTypes.STRING,
      creation: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Company',
    }
  );
  return Company;
};
