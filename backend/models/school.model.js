const mongoose = require('mongoose');
const schoolSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    address: {
        required: true,
        type: String,
    },
    district: {
        required: true,
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
   
},

{
    timestamps: true
});
const schoolModel = mongoose.model('school', schoolSchema)
module.exports = schoolModel