const { handleHashPassword, handleSignToken } = require('../helpers/helpers');

const Users = require('../models/Users')

require('dotenv').config()
const { decode } = require('jsonwebtoken');

const handleRegister = async (req, res) => {
    try {
        const { email, password, rol, lenguage } = req.body
        
        if (!email || !password) {
            res.status(400).json({ msg: 'Email y password requeridos' })
        } 
        else {
            const passwordHashed = handleHashPassword(password); 
            const verifyIfUser = await Users.VerificarUsuario(email)

            if (verifyIfUser.exist) {
                return res.status(400).json({ msg: 'Ya existe un usuario con este email' });

            } else {
                const response = await Users.CrearUsuario(email, passwordHashed, rol, lenguage);
                return res.status(200).json(response);
            }
        }
    } catch (error) {
        throw error
    }
}

 
const handleLogin = async (req, res) => {
                        
    try {
        const { email, password } = req.body 
        if (!email || !password) {
            res.status(400).json({ msg: 'Email y password requeridos' })   
        } else {
            const passwordMatch = await Users.VerificarPassword(email, password)
            if (passwordMatch.match) {
                res.status(200).json({
                    token: handleSignToken({ email, roles: ['admin', 'customer'] })     
                })
            } else {  
                res.status(401).json({ msg: 'Credenciales incorrectas' })
            }
        }

    } catch (error) {
        throw error
    }
}

const handleGetUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await Users.FindByEmail(email);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor: ' + error.message });
    }
};

const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.email) {
            return res.status(400).json({ msg: 'Usuario no autenticado o sin email' });
        }
        const { email } = req.user; 
        const response = await Users.Delete(id);
        res.status(200).json({ msg: `El usuario ${email} ha eliminado al usuario con ID ${id}` });
    } catch (error) {
        res.status(500).json({ msg: `Error en el servidor: ${error.message}` });
    }
};
module.exports = {
    handleRegister,
    handleLogin,
    handleGetUser,
    handleDeleteUser
}