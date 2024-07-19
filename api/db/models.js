const { UserSchema, User } = require('./../components/user/user.model');
const { ProductSchema, Product } = require('./../components/product/product.model');
const { CategorySchema, Category } = require('./../components/category/category.model');
const { CustomerSchema, Customer } = require('./../components/customer/customer.model');
const { OrderSchema, Order } = require('./../components/order/order.model');
const { OrderProductSchema, OrderProduct } = require('./../components/order/order-product.model');

function setupModel(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModel;
