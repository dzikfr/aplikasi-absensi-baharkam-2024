const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db.js');

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


//port listen server app
app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
});