const {config}=require('./../config/config') 
// const URI = config.urlMysql||`mysql://root:admin123@localhost:3306/my_store`;

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres'
  }
}
