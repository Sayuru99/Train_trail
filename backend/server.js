const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Database connected successfully');
  }
});

const authRoutes = require('./src/routes/authRoutes');
const { authenticateJwt } = require('./src/middleware/authMiddleware');

app.use('/api/users', authRoutes); 

app.get('/api/protected', authenticateJwt, (req, res) => {
  res.json({ message: 'Protected route' });
});

app.get('/',(re,res) =>{
  return res.json("Backend Bruh!");
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
