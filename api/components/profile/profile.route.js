const express = require('express');
const passport = require('passport');
const {myOrders} = require('../order/order.controller');
const router = express.Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  myOrders, 
);

module.exports = router;
