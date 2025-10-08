// src/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    adSoyad: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true
    },
    sifreHash: { // Şifreyi hash'lenmiş hali
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);