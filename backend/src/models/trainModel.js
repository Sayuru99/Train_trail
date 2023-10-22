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
    const connection = await pool.getConnection();
    const [trains] = await connection.query(getAllTrainsQuery);
    connection.release();
    return trains;
  } catch (error) {
    throw error;
  }
}

async function addTrain(trainData) {
  try {
    const { trainName, RouteID, Type, CreatedOnDate, UpdatedOnDate, Status } = trainData;

    const insertTrainQuery = `
      INSERT INTO train (TrainName, RouteID, Type, CreatedOnDate, UpdatedOnDate, Status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const connection = await pool.getConnection();
    const [result] = await connection.query(insertTrainQuery, [trainName, RouteID, Type, CreatedOnDate, UpdatedOnDate, Status]);
    connection.release();

    if (result.affectedRows === 1) {
      return { message: 'Train added successfully' };
    } else {
      throw new Error('Train addition failed');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllTrains,
  addTrain,
};
