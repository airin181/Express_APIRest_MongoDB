// preparar la app para generar rutas
const express = require('express');

const app = express();

// Config Express

//para poder interactuar con archivos json y gestionarlos
app.use(express.json());
//para obtener elementos de la ruta
app.use(express.urlencoded({extended: true}));

//creamos ruta
app.get('/', (req, res) => {
    res.send('Todo OK por aquí')
})

module.exports = app;