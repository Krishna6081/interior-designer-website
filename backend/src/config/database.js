const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
// Importing the dependencies and environment setup
dotenv.config();
// Creating the mysql connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'interior_designer_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully!');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL Connection Failed:', error.message);
  }
}

testConnection();
// exporting the conncetion pool
module.exports = pool;
