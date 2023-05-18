const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const RegisterPerson = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    personImg: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active'
    }
}, { timestamps: true })

RegisterPerson.plugin(mongoosePaginate);

module.exports = mongoose.model('RegisterPersons', RegisterPerson);