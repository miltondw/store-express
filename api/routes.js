const express=require('express')

const productsRouter=require('./product/products.route')
const usersRouter=require('./user/users.route')
const customerRouter=require('./customer/customers.route')
const categoriesRouter=require('./category/categories.route')
const ordersRouter=require('./order/order.route')

const routerApi=(app)=>{
    const router=express.Router()
    app.use('/api/v1',router)
    router.use('/products',productsRouter)
    router.use('/users',usersRouter)
    router.use('/customers',customerRouter)
    router.use('/categories',categoriesRouter)
    router.use('/orders',ordersRouter)
}

module.exports=routerApi