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
const userRoutes = require('./src/routes/userRoutes');
const trainRoutes = require('./src/routes/trainRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const stationRoutes = require('./src/routes/stationRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const priceRoutes = require('./src/routes/priceRoutes');
const { authenticateJwt } = require('./src/middleware/authMiddleware');

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/reservation', reservationRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/news', newsRoutes); 

app.get('/api/protected', authenticateJwt, (req, res) => {
  res.json({ message: 'Protected route' });
});

app.get('/',(req,res) =>{
  return res.json("Backend Bruh!");
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
