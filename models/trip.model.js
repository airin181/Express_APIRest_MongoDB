const mongoose = require('mongoose')

//schema: clase que nos permite generar la estructura de los documentos en las colecciones de las bbdd
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    destination: { type: String, required: true, maxlength: 15},
    category: { type: String, enum: ['familiar', 'amigos', 'trabajo']},
    start_date: { type: Date, required: true },
    end_date: { type: Date }
}, {
    //para cada doc created at + updated at
    timestamps: true
});

// Se exporta. Importante llamar abajo a mongoose.model para relacionar el nombre de colección con el esquema creado.
// Se escribe en singular. Luego automáticamente Mongodb (o mongoose) crea la colección con el nombre en plural
module.exports = mongoose.model('trip', tripSchema); 