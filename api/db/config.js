<<<<<<< HEAD
const {config}=require('@api/config/config')
const URI = config.urlMysql||`mysql://root:admin123@localhost:3306/my_store`;
=======
const { config } = require('./../config/config');
>>>>>>> fix/postgres

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}