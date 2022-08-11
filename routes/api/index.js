//configuración particular de RUTAS DE API

const router = require('express').Router();

// todas las peticiones que vengan con trips me las mandas a este otro fichero. Él las gestiona.
// no hace falta poner api delante porque ya está en el index inicial de rutas de api
router.use('/trips', require('./trips.route'))


module.exports = router;