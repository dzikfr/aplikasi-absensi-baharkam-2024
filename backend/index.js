const express = require('express');
const {config} = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


//init express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());


//env config
config();


//connect db
mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log('mongodb connected'))
    .catch((e)=>{
        console.log('error: ', e)
    })


//port listen server app
app.listen(process.env.PORT, () => {
    console.log(`Server berjalan pada port ${process.env.PORT}`);
});