// src/config/db.js 

const mongoose = require('mongoose');
require('dotenv').config();  //ortam değişkenlerini yükle

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB bağlantısı başarılı.');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error.message);
        // Uygulamayı sonlandır (kritik hata)
        process.exit(1); 
    }
};

module.exports = connectDB;