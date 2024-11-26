const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db.js');
const authRoutes = require('./routes/authRoute');

//init express
const app = express();

//middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
app.use(express.json());


//env config
config();


//connect db
//./config/db.js
connectDb();

//routes
app.use('/api/leave', require('./routes/leaveRoute.js'));
app.use('/api/employee', require('./routes/employeeRoute.js'));
app.use('/api/division', require('./routes/divisionRoute.js'));
app.use('/api/master', require('./routes/masterRoute.js'));
app.use('/api/admin', require('./routes/adminRoute.js'));
app.use('/api/attendance', require('./routes/attendanceRoute.js'));
app.use('/auth/admin', authRoutes);

//port listen server app
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});