const mongoose = require("mongoose");
const secretManager = require('../helper/secretManager');
const logger = require("../helper/logger");

const connectDB = async () => {
    try {
        const secrets = await secretManager.getSecrets;
        process.env['MONGO_URI'] = secrets['MONGO_URI'];
        process.env['AWS_BUCKET_NAME'] = secrets['AWS_BUCKET_NAME'];
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("heeloo")
        logger.info(`MongoDB connected: ${con.connection.host}`);
        return con;
    } catch (err) {
        logger.error(`Mongo Connection Error: ${err}`);
        return null;
    }
}

module.exports = connectDB;