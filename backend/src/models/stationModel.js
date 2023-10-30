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

async function getAllStations() {
  try {
    const getAllStationsQuery = 'SELECT * FROM station';
    const connection = await pool.getConnection();
    const [stations] = await connection.query(getAllStationsQuery);
    connection.release();
    return stations;
  } catch (error) {
    throw error;
  }
}

async function addStation(stationData) {
  try {
    const { StationName } = stationData;

    const insertStationQuery = `
      INSERT INTO station (StationName)
      VALUES (?)
    `;

    const connection = await pool.getConnection();
    const [result] = await connection.query(insertStationQuery, [StationName]);
    connection.release();

    if (result.affectedRows === 1) {
      return { message: 'Station added successfully' };
    } else {
      throw new Error('Station addition failed');
    }
  } catch (error) {
    throw error;
  }
}

// for dev

async function addStations(stationDataArray) {
  try {
    const connection = await pool.getConnection();
    const insertStationQuery = 'INSERT INTO station (StationName) VALUES ?';

    const values = stationDataArray.map((stationData) => [stationData.StationName]);

    const [result] = await connection.query(insertStationQuery, [values]);
    connection.release();

    if (result.affectedRows > 0) {
      return { message: 'Stations added successfully' };
    } else {
      throw new Error('Station addition failed');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllStations,
  addStation,
  addStations,
};
