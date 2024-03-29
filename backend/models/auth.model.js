const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    image: {
    required: false,
    type: String,
    
    },
    school: {
        type: mongoose.Types.ObjectId,
        ref: "school"
    }
},

{
    timestamps: true
});
const userModel = mongoose.model('user', userSchema)
module.exports = userModel