// src/utils/jwt.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateToken = (payload) => {
    // payload: Token içinde tutulacak bilgiler (örneğin: { id: user._id })
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN 
    });
};

module.exports = {
    generateToken
};