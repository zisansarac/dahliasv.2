// src/config/db.js

const mysql = require('mysql2');
require('dotenv').config(); // .env dosyasını yükle

// Havuz (Pool) oluşturmak, her istek için yeni bağlantı açmaktan daha verimlidir.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promise tabanlı bağlantı havuzunu dışa aktar
module.exports = pool.promise();