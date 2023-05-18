const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PlateHistory = mongoose.Schema({
    cameraid: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    time_in: {
        type: String
    },
    time_out: {
        type: String
    },
    time_visited: {
        type: String
    },
    plateImg: {
        type: String,
        required: true
    },
    isRegister: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

PlateHistory.plugin(mongoosePaginate);

module.exports = mongoose.model('PlateHistories', PlateHistory);