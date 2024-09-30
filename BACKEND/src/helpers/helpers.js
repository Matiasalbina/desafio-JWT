require('dotenv').config();
const { hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


if (!JWT_SECRET) {
    throw new Error('Falta la clave secreta JWT_SECRET en el archivo .env');
}

const handleHashPassword = (password) => {
    return hashSync(password, 10);
};

const verificarContraseña = (password, hashedPassword) => {
    return compareSync(password, hashedPassword);
};

const handleSignToken = (data) => {
    return sign(data, JWT_SECRET, { expiresIn: 60 * 60 });
};

module.exports = {
    handleHashPassword,
    verificarContraseña,
    handleSignToken
};
