const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db.js');
const userRouter = require('./routes/userRouter.js');
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
app.use('/api', userRouter);
app.use('/api', employeeRouter);
app.use('/api', attendanceRouter);


//port listen server app
app.listen(process.env.PORT, () => {
    console.log(`Server berjalan pada port ${process.env.PORT}`);
});