require('dotenv').config()
const { Pool } = require('pg')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const db = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
})

const createTables = async () => {
    await db.query(
        `
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) NOT NULL,
           password VARCHAR(60) NOT NULL, 
           rol VARCHAR(25), 
           lenguage VARCHAR(20)
        );
        `
    )

}

const insertData = async () => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM usuarios');
        const count = parseInt(result.rows[0].count);

        if (count === 0) {
            await db.query(`
                INSERT INTO usuarios (nombre, email, rol, lenguage) VALUES
                    ('juan Martinez', 'juan.martinez@example.com', 'user', 'Ruby'),
                    ('Felipe Gonzales', 'felipe.gonzales@example.com', 'admin', 'PHP')
                ON CONFLICT (email)
                DO NOTHING;
            `);
            console.log('Datos insertados correctamente.');
        } else {
            console.log('La tabla ya tiene registros, no se insertó ningún dato.');
        }
    } catch (err) {
        console.error('Error al insertar datos:', err);
    }
};




const initDB = async () => {
    console.log('Creando tablas si no existen')
    await createTables()
    console.log('Insertando datos si no existen')
    await insertData()
}

module.exports = {
    db,
    initDB
}