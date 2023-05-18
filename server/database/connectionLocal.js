const mongoose = require('mongoose');
const logger = require("../helper/logger");


const connectDB = async () => {
    try {
        const con = await mongoose.connect('mongodb+srv://shailja1213:shacha$30@cluster0.pfkqks0.mongodb.net/',{
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