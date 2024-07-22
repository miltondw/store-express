const express=require('express')

const productsRouter=require('./components/product/products.route')
const usersRouter=require('./components/user/users.route')
const customerRouter=require('./components/customer/customers.route')
const categoriesRouter=require('./components/category/categories.route')
const ordersRouter=require('./components/order/order.route')
const authRouter=require('./utils/auth/auth.route')
const routerApi=(app)=>{
    const router=express.Router()
    app.use('/api/v1',router)
    router.use('/products',productsRouter)
    router.use('/users',usersRouter)
    router.use('/customers',customerRouter)
    router.use('/categories',categoriesRouter)
    router.use('/orders',ordersRouter)
    router.use('/auth',authRouter)
}

module.exports=routerApi