require('dotenv').config(); 
const jwt = require('jsonwebtoken');  

const { JWT_SECRET } = process.env;  

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido o expirado' });
    }
};

module.exports = {
    authMiddleware
};
