// src/app.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 

// .env dosyasını yükle
dotenv.config();

// Veritabanı bağlantısını başlat
connectDB(); 

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express();

// Middleware: Gelen JSON body verilerini işler
app.use(express.json());


app.use('/api/auth', authRoutes); // Tüm yetkilendirme rotaları /api/auth altında olacak
app.use('/api/orders', orderRoutes); // Sipariş rotaları /api/orders altında olacak


// Basit ana sayfa kontrolü
app.get('/', (req, res) => {
    res.status(200).json({ message: "Emekçi Kadınlar Kargo Takip API'si çalışıyor." });
});

// Sunucuyu dinlemeye başla
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});