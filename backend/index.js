const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db.js');
const adminRouter = require('./routes/adminRouter.js');
const employeeRouter = require('./routes/employeeRouter.js');
const attendanceRouter = require('./routes/attendanceRouter.js');

//init express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());


//env config
config();


//connect db
//./config/db.js
connectDb();


//api
app.use('/api', adminRouter);
app.use('/api', employeeRouter);
app.use('/api', attendanceRouter);


//get no routes to asset
app.use('/assets/data', (req, res, next) => {
    res.status(403).send('Access Forbidden');
});


//port listen server app
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});