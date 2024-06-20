const { UserSchema, User } = require('./user.model');
const { ProductSchema, Product } = require('./product.model');
const { CategorySchema, Category } = require('./category.model');
const { CustomerSchema, Customer } = require('./customer.model');

function setupModel(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
}

module.exports = setupModel;
