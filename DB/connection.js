const mongoose = require('mongoose')
const DB = process.env.DATABASE;
// console.log(DB);
mongoose.connect(DB).
then((value) => {
    console.log('connection successful');
}).catch((error) => {
    console.log("ERROR");
    console.log(error);
})