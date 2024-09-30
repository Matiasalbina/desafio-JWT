require('dotenv').config()
const { hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = process.env
const handleHashPassword = (password) => {
    return hashSync(password, 10)
}

const verificarContraseña = (password, hashedPassword) => {
    return compareSync(password, hashedPassword)
}

const handleSignToken = (data) => {
    return sign(data, String(JWT_SECRET), { expiresIn: 60 * 60 })
}


module.exports = {
    handleHashPassword,
    verificarContraseña,
    handleSignToken
}