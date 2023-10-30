const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { isAdmin } = require('../middleware/authMiddleware');

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

router.post('/add', isAdmin, async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO passenger (Username, Password, Email, UserType, CreatedOn, UpdatedOn)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    const connection = await pool.getConnection();

    const [result] = await connection.query(insertUserQuery, [
      username,
      hashedPassword,
      email,
      0,
    ]);

    connection.release();

    if (result.affectedRows === 1) {
      res.status(201).json({ message: 'User added successfully' });
    } else {
      res.status(500).json({ error: 'User registration failed' });
    }
  } catch (error) {
    console.error('Error adding user: ', error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

router.delete('/:userId', isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    const deleteUserQuery = `
      DELETE FROM passenger WHERE PassengerID = ?
    `;

    const connection = await pool.getConnection();

    const [result] = await connection.query(deleteUserQuery, [userId]);

    connection.release();

    if (result.affectedRows === 1) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user: ', error);
    res.status(500).json({ error: 'User deletion failed' });
  }
});

router.put('/:userId', isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password, email } = req.body;

    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updateUserQuery = `
      UPDATE passenger
      SET Username = ?, Password = ?, Email = ?
      WHERE PassengerID = ?
    `;

    const connection = await pool.getConnection();
    const [result] = await connection.query(updateUserQuery, [
      username,
      hashedPassword,
      email,
      userId,
    ]);

    connection.release();

    if (result.affectedRows === 1) {
      res.json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'User update failed' });
  }
});

router.get('/', isAdmin, async (req, res) => {
  try {
    const getAllUsersQuery = 'SELECT * FROM passenger';

    const connection = await pool.getConnection();
    const [users] = await connection.query(getAllUsersQuery);

    connection.release();
    res.json({ users });
  } catch (error) {
    console.error('Error getting users: ', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

module.exports = router;