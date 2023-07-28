Product.belongsToMany(models.Order, {
    through: models.OrderProduct,
  });
  Product.belongsTo(models.Category);
  Product.hasMany(models.Review);
  Product.belongsTo(models.Company);