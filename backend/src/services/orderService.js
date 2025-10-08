// src/services/orderService.js

const Order = require('../models/Order');

// Yeni sipariş oluşturma
const createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    return await newOrder.save();
};

// Kullanıcıya ait tüm siparişleri getirme
const getOrdersByUserId = async (userId) => {
    // Sadece bu kullanıcıya ait siparişleri çeker
    return await Order.find({ userId }).sort({ createdAt: -1 });
};

// Belirli bir siparişi ID ve Kullanıcı ID'si ile bulma (Yetkilendirme için önemli)
const getOrderById = async (orderId, userId) => {
    return await Order.findOne({ _id: orderId, userId });
};

// Siparişi güncelleme
const updateOrder = async (orderId, userId, updateData) => {
    // Sadece o kullanıcıya ait olan siparişi günceller
    const order = await Order.findOneAndUpdate(
        { _id: orderId, userId },
        updateData,
        { new: true, runValidators: true } // Güncellenmiş dokümanı döndür ve şema kurallarını kontrol et
    );
    return order;
};

// Siparişi silme
const deleteOrder = async (orderId, userId) => {
    // Sadece o kullanıcıya ait olan siparişi siler
    const result = await Order.findOneAndDelete({ _id: orderId, userId });
    return result;
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrder,
    deleteOrder
};