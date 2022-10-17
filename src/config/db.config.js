const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = ()=>{
    try {
        mongoose.connect(`mongodb://${process.env.DB}`,(err,res)=>{
            if(res) console.log("Database connected sucessfully...");
            else throw err;
        })
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;