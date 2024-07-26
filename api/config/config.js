require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbUrl:  process.env.DATABASE_URL,
  dbPort:  process.env.DB_PORT,
  apiKey:  process.env.API_KEY,
  jwtSecret:  process.env.JWT_SECRET,
  smtpEmail:  process.env.SMTP_EMAIL,
  smtpPassword:  process.env.SMTP_PASSWORD,
  urlMysql:  process.env.URL_MYSQL
}

module.exports = { config };
