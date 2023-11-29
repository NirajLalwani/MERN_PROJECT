const mongoose = require('mongoose')
const express = require('express')
const dontenv = require('dotenv')
const app = express()
const cookieParser = require("cookie-parser")
const path = require('path')
app.use(express.static(path.join(__dirname, "build")));
app.use(cookieParser());
dontenv.config({ path: "./config.env" })

const PORT = process.env.PORT || 5000;

// console.log(PORT)
// const DB = 'mongodb+srv://niraj:niraj123456@cluster0.kiolqfd.mongodb.net/MERN_STACK?retryWrites=true&w=majority';
// const DB = "mongodb+srv://nirajmern:niraj123@cluster0.91madvt.mongodb.net/MERN_THAPA?retryWrites=true&w=majority"; 

// File of Data base Connection
require('./DB/connection')


// 
app.use(express.json())

// We link the router files to make our route easy. 
app.use(require('./Router/auth'))


app.listen(PORT, () => {
    console.log("Server Started at ", PORT);
})



// mongodb+srv://<username>:<password>@cluster0.kiolqfd.mongodb.net/?retryWrites=true&w=majority