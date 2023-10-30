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

async function bookTrain(bookingData) {
  try {
    const { TrainID, CompartmentID, StationID, SeatID, Price, CreatedDate, DepartureTime, StartTime, PassengerID } = bookingData;

    const insertBookingQuery = `
      INSERT INTO reservation (TrainID, CompartmentID, StationID, SeatID, Price, CreatedDate, DepartureTime, StartTime, PassengerID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const connection = await pool.getConnection();
    const [result] = await connection.query(insertBookingQuery, [TrainID, CompartmentID, StationID, SeatID, Price, CreatedDate, DepartureTime, StartTime, PassengerID]);
    connection.release();

    if (result.affectedRows === 1) {
      return { message: 'Train booked successfully' };
    } else {
      throw new Error('Train booking failed');
    }
  } catch (error) {
    throw error;
  }
}

async function getTrainBookingDetails(bookingID) {
  try {
    const getBookingQuery = 'SELECT r.TrainID, r.CompartmentID, r.StationID, r.SeatID, r.Price, r.CreatedDate, r.DepartureTime, r.StartTime, t.TrainName, c.Class, s.SeatNumber FROM reservation r JOIN train t ON r.TrainID = t.TrainID JOIN compartment c ON r.CompartmentID = c.CompartmentID JOIN seat s ON r.SeatID = s.SeatID WHERE r.ReservationID = ?';

    const connection = await pool.getConnection();
    const [bookingDetails] = await connection.query(getBookingQuery, [bookingID]);
    connection.release();

    if (bookingDetails.length === 1) {
      return bookingDetails[0];
    } else {
      throw new Error('Booking not found');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  bookTrain,
  getTrainBookingDetails,
};
