// src/models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // Siparişi oluşturan kullanıcıya referans
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User modeline bağlantı kurar
        required: true
    },
    musteriAdi: {
        type: String,
        required: true,
        trim: true
    },
    urunAciklamasi: {
        type: String,
        required: true
    },
    kargoTakipNo: {
        type: String,
        unique: true,
        sparse: true, // Null değerler için benzersizliği zorlamaz
        default: null
    },
    durum: {
        type: String,
        enum: ['Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi', 'İptal'],
        default: 'Hazırlanıyor'
    },
    sonGuncelleme: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // createdAt ve updatedAt otomatik eklenir
});

module.exports = mongoose.model('Order', OrderSchema);