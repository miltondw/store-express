const express=require('express')

const productsRouter=require('./products.route')
const usersRouter=require('./users.route')
const customerRouter=require('./customers.route')
const categoriesRouter=require('./categories.route')
const ordersRouter=require('./order.route')

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