const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'sms_db',
  waitForConnections: true,
  connectionLimit: 10,
});
if(pool){
  console.log("well connected")
}

module.exports = pool;
