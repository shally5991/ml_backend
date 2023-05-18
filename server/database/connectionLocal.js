const mongoose = require('mongoose');
const logger = require("../helper/logger");
const DB = process.env.DATABASE


const connectDB = async () => {
    try {
        const con = await mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true            
        });
        logger.info(`MongoDB connected: ${con.connection.host}`);
        return con;
    } catch (err) {
        logger.error(`Mongo Connection Error: ${err}`);
        return null;
    }
}
module.exports = connectDB;