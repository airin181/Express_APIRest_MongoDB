//configuración GLOBAL DE RUTAS
// --> se envian rutas al archivo index.js de la carpeta 'api'

const app = require('../app');

const router = require('express').Router();

// cada vez que entre una petición de cualquier verbo si viene con el prefijo /api me lo vas a mandar a esta carpeta (./api):
router.use('/api', require('./api'));



module.exports = router;