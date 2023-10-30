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

async function getAllTrains() {
  try {
    const getAllTrainsQuery = 'SELECT * FROM train';
    const [rows] = await pool.query(getAllTrainsQuery);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function addTrain(trainData) {
  try {
    const { TrainName, RouteID, Type, CreatedOnDate, UpdatedOnDate, Status } = trainData;

    const insertTrainQuery = `
      INSERT INTO train (TrainName, RouteID, Type, CreatedOnDate, UpdatedOnDate, Status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(insertTrainQuery, [TrainName, RouteID, Type, CreatedOnDate, UpdatedOnDate, Status]);

    if (result.affectedRows === 1) {
      return { message: 'Train added successfully' };
    } else {
      throw new Error('Train addition failed');
    }
  } catch (error) {
    throw error;
  }
}

async function addArrive(trainID, stationID) {
  try {
    const insertArriveQuery = `
      INSERT INTO arrive (TrainID, StationID)
      VALUES (?, ?)
    `;
    const [result] = await pool.query(insertArriveQuery, [trainID, stationID]);

    if (result.affectedRows === 1) {
      return { message: 'Arrival relationship added successfully' };
    } else {
      throw new Error('Arrival relationship addition failed');
    }
  } catch (error) {
    throw error;
  }
}

async function getTrainsBetweenStations(fromStationId, toStationId) {
  try {
    const getTrainsQuery = `
      SELECT t.TrainName
      FROM train t
      INNER JOIN arrive a1 ON t.TrainID = a1.TrainID
      INNER JOIN arrive a2 ON t.TrainID = a2.TrainID
      WHERE a1.StationID = ? AND a2.StationID = ?
    `;

    const connection = await pool.getConnection();
    const [trains] = await connection.query(getTrainsQuery, [fromStationId, toStationId]);
    connection.release();
S
    return trains;s
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getAllTrains,
  addTrain,
  addArrive,
  getTrainsBetweenStations,
};