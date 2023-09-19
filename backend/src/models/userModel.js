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
    // Create a new database connection
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    await db.connect();

    const user = await db.query('SELECT * FROM Users WHERE Email = ?', [email]);

    if (!user[0]) {
      db.end(); 
      return "Error";
    }

    const passwordMatch = await bcrypt.compare(password, user[0].Password);

    db.end();

    if (!passwordMatch) {
      return "Fucked";
    }

    return { username: user[0].Username, email: user[0].Email };
  } catch (error) {
    throw error;
  }
}


module.exports = { registerUser, loginUser };
