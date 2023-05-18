const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PersonHistory = mongoose.Schema({
    cameraid: {
        type: String,
        required: true
    },
    name: {
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
    personImg: {
        type: String,
    },
    isRegister: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

PersonHistory.plugin(mongoosePaginate);

module.exports = mongoose.model('PersonHistories', PersonHistory)
    
