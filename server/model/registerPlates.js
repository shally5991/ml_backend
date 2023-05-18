const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const RegisterPlate = mongoose.Schema({
    plate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    }
}, { timestamps: true })

RegisterPlate.plugin(mongoosePaginate);

module.exports = mongoose.model('RegisterPlates', RegisterPlate);