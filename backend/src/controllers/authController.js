// src/controllers/authController.js

const authService = require('../services/authService');
const { comparePassword } = require('../utils/crypto');
const { generateToken } = require('../utils/jwt');

// POST /api/auth/register
exports.register = async (req, res) => {
    const { adSoyad, email, sifre } = req.body;

    if (!adSoyad || !email || !sifre) {
        return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    try {
        // İş mantığı için Service'i çağır
        const userId = await authService.registerUser(adSoyad, email, sifre);
        
        // Kayıt sonrası otomatik token oluşturma
        const token = generateToken({ id: userId });

        res.status(201).json({ 
            message: 'Kullanıcı başarıyla kaydedildi.',
            token,
            userId
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Kayıt işlemi sırasında bir hata oluştu.' });
    }
};


// POST /api/auth/login
exports.login = async (req, res) => {
    const { email, sifre } = req.body;

    if (!email || !sifre) {
        return res.status(400).json({ message: 'E-posta ve şifre zorunludur.' });
    }

    try {
        const user = await authService.findUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        const isMatch = await comparePassword(sifre, user.sifreHash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        // Token oluşturma
        const token = generateToken({ id: user._id });

        res.status(200).json({ 
            message: 'Giriş başarılı.', 
            token,
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({ message: 'Giriş işlemi sırasında bir hata oluştu.' });
    }
};