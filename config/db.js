const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected succesfully!');
    } catch (error) {
        console.log(`Connection error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;

