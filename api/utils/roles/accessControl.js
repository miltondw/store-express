const AccessControl = require('accesscontrol');
const ac = new AccessControl();

ac.grant('customer')
  .readOwn('profile')
  .updateOwn('profile')
  .createOwn('order')
  .readOwn('order')
  .updateOwn('order')
  .deleteOwn('order')
  .readAny('product')
  .readAny('category');

ac.grant('admin')
  .extend('customer')
  .createAny('product')
  .updateAny('product')
  .deleteAny('product')
  .createAny('user')
  .updateAny('user')
  .deleteAny('user')
  .createAny('customer')
  .updateAny('customer')
  .deleteAny('customer')
  .createAny('category')
  .updateAny('category')
  .deleteAny('category');


  module.exports = ac;
