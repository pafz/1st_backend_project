Product.belongsToMany(models.Order, {
  through: models.OrderProduct,
});
Product.belongsTo(models.Category);

/////////////////

Order.belongsToMany(models.Product, {
  through: models.OrderProduct,
});
Order.belongsTo(models.User);
