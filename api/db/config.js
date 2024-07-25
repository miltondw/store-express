const {config}=require('@api/config/config')
const URI = config.urlMysql||`mysql://root:admin123@localhost:3306/my_store`;

module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
  },
  production: {
    url: URI,
    dialect: 'mysql',
  }
}