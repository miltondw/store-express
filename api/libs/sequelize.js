const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModel = require('../db/models');
 
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = `mysql://root:admin123@localhost:3306/my_store`;

// const sequelize = new Sequelize(URI, { dialect: 'postgres' });
const sequelize = new Sequelize(URI, { dialect: 'mysql'});

setupModel(sequelize)
// sequelize.sync()

module.exports = sequelize;
