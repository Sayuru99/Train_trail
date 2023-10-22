const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

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

async function registerUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO Passenger (Username, Email, Password, UserType)
      VALUES (?, ?, ?, ?)
    `;

    const connection = await pool.getConnection();

    const [result] = await connection.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
      0,
    ]);

    connection.release();

    if (result.affectedRows === 1) {
      return { username, email };
    } else {
      throw new Error("User registration failed");
    }
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    const [rows] = await pool.query("SELECT * FROM Passenger WHERE Email = ?", [
      email,
    ]);

    if (!rows[0]) {
      console.log("User not found for email:", email);
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, rows[0].Password);

    if (!passwordMatch) {
      console.log("Invalid password for email:", email);
      return null;
    }

    const user = {
      userId: rows[0].PassengerID,
      username: rows[0].Username,
      email: rows[0].Email,
    };

    return user;
  } catch (err) {
    console.error("Database error during login:", err);
    throw err;
  }
}

module.exports = { registerUser, loginUser };
