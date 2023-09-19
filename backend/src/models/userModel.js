const mysql = require("mysql");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function registerUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    const insertUserQuery = `
      INSERT INTO Users (Username, Email, Password, UserType, CreatedOn, UpdatedOn)
      VALUES (?, ?, ?, ?, ?, ?)
    `;


    db.connect();

    const result = await new Promise((resolve, reject) => {
      db.query(
        insertUserQuery,
        [username, email, hashedPassword, false, currentDate, currentDate],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    db.end();

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
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    await db.connect();

    const results = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM Users WHERE Email = ?', [email], async (err, results) => {
        if (err) {
          db.end();
          console.error('Database query error:', err);
          reject(err);
        }

        if (!results[0]) {
          db.end();
          console.log('User not found for email:', email);
          resolve(null);
        }

        const passwordMatch = await bcrypt.compare(password, results[0].Password);

        db.end();

        if (!passwordMatch) {
          console.log('Invalid password for email:', email);
          resolve(null);
        }
        const user = {
          userId: results[0].UserID,
          username: results[0].Username,
          email: results[0].Email,
        };
        resolve(user);
      });
    });

    return results; // Return the user object

  } catch (err) {
    console.error('Database error during login:', err);
    throw err;
  }
}

module.exports = { registerUser, loginUser };
