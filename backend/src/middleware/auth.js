// src/middleware/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware fonksiyonu
const protect = (req, res, next) => {
    let token;

    // 1. Authorization başlığını kontrol et (Bearer token formatı)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 'Bearer ' kısmını çıkarıp sadece token'ı al
            token = req.headers.authorization.split(' ')[1];

            // 2. Token'ı gizli anahtar (JWT_SECRET) ile doğrula
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Token içindeki kullanıcı ID'sini isteğe (req) ekle
            // Bu sayede controller katmanında hangi kullanıcının işlem yaptığını bileceğiz.
            req.user = { id: decoded.id }; 

            // İşleme devam et (controller'a geç)
            next();

        } catch (error) {
            console.error('Token doğrulama hatası:', error.message);
            return res.status(401).json({ message: 'Yetkilendirme başarısız, token geçersiz.' });
        }
    }

    // Token hiç gönderilmediyse
    if (!token) {
        return res.status(401).json({ message: 'Yetkilendirme başarısız, token yok.' });
    }
};

module.exports = protect;