const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    },
    password: { 
        type: String, 
        required: true 
    },
    active: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date, 
        default: Date.now 
    },
    profile: {
        type: Object
    }
})

module.exports = mongoose.model('User', userSchema)
