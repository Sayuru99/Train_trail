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

async function getAllNews() {
  try {
    const getAllNewsQuery = 'SELECT * FROM news';
    const connection = await pool.getConnection();
    const [news] = await connection.query(getAllNewsQuery);
    connection.release();
    return news;
  } catch (error) {
    throw error;
  }
}

async function addNews(newsData) {
  try {
    const { Title, Content, DatePosted } = newsData;

    const insertNewsQuery = `
      INSERT INTO news (Title, Content, DatePosted)
      VALUES (?, ?, ?)
    `;

    const connection = await pool.getConnection();
    const [result] = await connection.query(insertNewsQuery, [Title, Content, DatePosted]);
    connection.release();

    if (result.affectedRows === 1) {
      return { message: 'News added successfully' };
    } else {
      throw new Error('News addition failed');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllNews,
  addNews,
};
