const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    reg_no: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    f_name: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    },
    dob: {
        required: true,
        type: String,
    },
    clas: {
        required: true,
        type: String,
        enum: ["6th","7th","8th","9th","10th"]
    },
    domicile: {
        required: true,
        type: String,
    },
    previous_school: {
        required: true,
        type: String,
    },
    image: {
    required: false,
    type: String,
    
    },
    session: {
        required: true,
        type: Number
    }
    
});
const studentModel = mongoose.model('student', studentSchema)
module.exports = studentModel