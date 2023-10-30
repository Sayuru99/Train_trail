const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getTicketPrice(fromStationID, toStationID) {
  try {
    const query = 'SELECT Price FROM TicketPrices WHERE FromStationID = ? AND ToStationID = ?';
    const [rows] = await pool.query(query, [fromStationID, toStationID]);
    if (rows.length === 1) {
      return rows[0].Price;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getTicketPrice,
};
