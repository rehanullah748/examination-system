const mongoose = require('mongoose');
const marksSchema = mongoose.Schema({
    
    reg_no: {
        required: true,
        type: String,
    },
 
    
    clas: {
        required: true,
        type: String,
        enum: ["6th","7th","8th","9th","10th"]
    },
    marks: {
        required: true,
        type: [],
    },
    
    examType: {
        required: true,
        type: String,
    },
    session: {
        required: true,
        type: Number
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
   
},

{
    timestamps: true
});
const marksModel = mongoose.model('mark', marksSchema)
module.exports = marksModel