const router = require('express').Router()
const { handleRegister, handleLogin, handleGetUser,handleDeleteUser } = require('../controllers/users.controllers')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.get('/', function (req, res) {
    res.send('Bienvenido a la API');
    })
    
router.get('*', (req, res) => {
    res.status(404).send('Ruta equivocada');
});

router.post('/usuarios', handleRegister)

router.post('/login', handleLogin)

router.get('/usuarios', authMiddleware, handleGetUser)

router.delete('/usuarios/:id', authMiddleware, handleDeleteUser)

module.exports = router