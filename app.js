// preparar la app para generar rutas
const express = require('express');

const app = express();

// CONFIG EXPRESS

//para poder interactuar con archivos json y gestionarlos
app.use(express.json());
//para obtener elementos de la ruta
app.use(express.urlencoded({extended: true}));
//le decimos que el fichero de routes gestionará todas las peticiones 
app.use(require('./routes'))

module.exports = app;