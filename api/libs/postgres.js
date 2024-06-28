
/*
* Connection with Pool and URI
const { Pool } = require('pg');
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool; 

*/



/* 
* Connection with Pool
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'miltondw',
  password: 'admin123',
  database: 'my_store',
});

module.exports = pool;
*/

/* 
* Connection with Client
const { Client } = require('pg');

async function getConnection(params) {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'miltondw',
    password: 'admin123',
    database: 'my_store',
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
*/