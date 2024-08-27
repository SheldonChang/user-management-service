const mongoose = require('mongoose');
const User = require('../models/userModel');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://root:Mo06uge9IHYx3Uv6nU2cBIvN@172.21.101.241:27017');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
module.exports = connectDB;