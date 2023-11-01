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

async function addFeedback(feedbackData) {
  try {
    const { PassengerID, Content } = feedbackData;

    const insertFeedbackQuery = `
      INSERT INTO feedback (PassengerID, Content, DateSubmitted)
      VALUES (?, ?, NOW())
    `;

    const connection = await pool.getConnection();
    const [result] = await connection.query(insertFeedbackQuery, [PassengerID, Content]);
    connection.release();

    if (result.affectedRows === 1) {
      return { message: 'Feedback added successfully' };
    } else {
      throw new Error('Feedback addition failed');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addFeedback,
};
