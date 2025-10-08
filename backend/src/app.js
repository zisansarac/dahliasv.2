// src/app.js

const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db'); // MySQL bağlantı modülümüz

// .env dosyasını yükle
dotenv.config();

const app = express();

// Middleware'ler (JSON parse ve URL kodlama)
app.use(express.json()); // Body'den gelen JSON verisini parse et

// Veritabanı bağlantı testi
app.get('/', async (req, res) => {
    try {
        // Basit bir sorgu ile bağlantıyı test et
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        console.log('MySQL bağlantısı başarılı:', rows);
        res.status(200).json({ 
            message: "Sunucu ve MySQL bağlantısı başarılı!",
            result: rows[0].solution
        });
    } catch (error) {
        console.error('MySQL bağlantı hatası:', error);
        res.status(500).json({ 
            message: "Sunucu çalışıyor, ancak MySQL bağlantısı başarısız.",
            error: error.message 
        });
    }
});


// Sunucuyu dinlemeye başla
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde calisiyor...`);
});