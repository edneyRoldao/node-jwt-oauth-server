const mongoose = require('mongoose')

const userPasswordUpdate = new mongoose.Schema({
    code: { type: String },
    email: { type: String },
    generated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserPasswordUpdate', userPasswordUpdate)
