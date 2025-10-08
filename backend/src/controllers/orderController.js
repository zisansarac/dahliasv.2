// src/controllers/orderController.js

const orderService = require('../services/orderService');

// POST /api/orders
exports.createOrder = async (req, res) => {
    // req.user.id, middleware'den gelen (token içindeki) kullanıcı ID'sidir.
    const userId = req.user.id; 
    const orderData = req.body;

    try {
        const newOrder = await orderService.createOrder({ ...orderData, userId });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Sipariş oluşturma hatası.', error: error.message });
    }
};

// GET /api/orders
exports.getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await orderService.getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Siparişleri getirme hatası.' });
    }
};

// GET /api/orders/:id
exports.getOrder = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;

    try {
        const order = await orderService.getOrderById(orderId, userId);

        if (!order) {
            // Ya ID yanlış ya da sipariş, token sahibine ait değil.
            return res.status(404).json({ message: 'Sipariş bulunamadı.' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Sipariş detayını getirme hatası.' });
    }
};

// PUT /api/orders/:id
exports.updateOrder = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;
    const updateData = req.body;
    
    // Kullanıcının güncelleyebileceği alanları filtrele (güvenlik için)
    // Örnek: userId'yi değiştirmesine izin vermeyiz.
    delete updateData.userId; 

    try {
        const updatedOrder = await orderService.updateOrder(orderId, userId, updateData);

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Güncellenecek sipariş bulunamadı.' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Sipariş güncelleme hatası.' });
    }
};

// DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
    const userId = req.user.id;
    const orderId = req.params.id;

    try {
        const result = await orderService.deleteOrder(orderId, userId);

        if (!result) {
            return res.status(404).json({ message: 'Silinecek sipariş bulunamadı.' });
        }

        // 204 No Content, silme işlemlerinde başarılı ama dönecek veri yok anlamına gelir.
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Sipariş silme hatası.' });
    }
};