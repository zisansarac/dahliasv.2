// src/routes/orderRoutes.js

const express = require('express');
const orderController = require('../controllers/orderController');
const protect = require('../middleware/auth'); // Yetkilendirme middleware'i

const router = express.Router();

// Tüm sipariş rotaları korunuyor
router.route('/')
    .post(protect, orderController.createOrder)      // Token gerekli: Yeni sipariş ekle
    .get(protect, orderController.getOrders);        // Token gerekli: Tüm siparişleri listele

router.route('/:id')
    .get(protect, orderController.getOrder)          // Token gerekli: Belirli bir siparişi gör
    .put(protect, orderController.updateOrder)       // Token gerekli: Siparişi güncelle
    .delete(protect, orderController.deleteOrder);   // Token gerekli: Siparişi sil

module.exports = router;