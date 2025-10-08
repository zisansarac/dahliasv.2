// src/services/authService.js

const User = require('../models/User'); 
const { hashPassword } = require('../utils/crypto');

// Kullanıcıyı kaydeder
const registerUser = async (adSoyad, email, sifre) => {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
        // Özel bir hata fırlatıyoruz
        const error = new Error('Bu e-posta adresi zaten kullanılıyor.');
        error.statusCode = 409; 
        throw error; 
    }

    const sifreHash = await hashPassword(sifre);

    const newUser = new User({ adSoyad, email, sifreHash });
    const savedUser = await newUser.save();
    
    return savedUser._id; 
};

// E-posta ile kullanıcıyı bulur
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// ID ile kullanıcıyı bulur (Token kontrolü için gerekli)
const findUserById = async (id) => {
    return await User.findById(id);
};

module.exports = {
    registerUser,
    findUserByEmail,
    findUserById
};