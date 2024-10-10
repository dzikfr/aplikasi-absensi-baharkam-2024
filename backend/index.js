const express = require('express');
const {config} = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./config/db.js');
const userRouter = require('./routes/userRouter.js');

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


//port listen server app
app.listen(process.env.PORT, () => {
    console.log(`Server berjalan pada port ${process.env.PORT}`);
});