const { db } = require('../db/config');

const { verificarContraseña } = require('../helpers/helpers');

const CrearUsuario = async (email, hashedPassword,rol = "Full Stack Developer", lenguage = "JavaScript") => {

    try {
        const SQLrequest = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *"                  
        const SQLValues = [email, hashedPassword, rol, lenguage]
        const { rows: [newUser] } = await db.query(SQLrequest, SQLValues)
       
        return {
            msg: 'Register success',
            data: newUser
        }

    } catch (error) {
        throw error
    }
}

const VerificarPassword = async (email, password) => {
    try {
        const userExist = await VerificarUsuario(email)
        if (userExist) {
            const hashedPassword = userExist.data.password
            const match = verificarContraseña(password, hashedPassword)
            if (match) {
                return {
                    msg: 'Existe contraseña',
                    match,
                }
            } else {
                return {
                    msg: 'Contraseña no concuerda',
                    match
                }
            }
        } else {
            return {
                msg: 'Usuario no existe',
                match: false

            }
        }
    } catch (error) {
        throw error
    }
}

const VerificarUsuario = async (email) => {
    try {
        const SQLrequest = "SELECT * FROM usuarios WHERE email = $1"
        const SQLValues = [email]
        const { rows: [user] } = await db.query(SQLrequest, SQLValues)
        return user ? { exist: true, data: user } : { exist: false, data: {} }
    } catch (error) {
        throw error
    }
}
const Delete = async (id) => {
    try {
        const SQLrequest = "DELETE FROM usuarios WHERE id = $1 RETURNING *"
        const SQLValues = [id]
        const { rows: [user] } = await db.query(SQLrequest, SQLValues)
        
        return {
            deleted: true,
            data: user
        }

    } catch (error) {
        throw error
    }
}

module.exports = {
    CrearUsuario,
    VerificarUsuario,
    VerificarPassword,
    Delete
}