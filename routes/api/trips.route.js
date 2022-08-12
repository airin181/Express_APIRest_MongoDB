//MANEJADOR FINAL

//aqui tendremos los get, put ... 
const router = require('express').Router();

//importamos el esquema de mongoose
const Trip = require('../../models/trip.model');

//función manejadora = req, res
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    }
    catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' })
    }
});

router.post('/', async (req,res) => {
    try {
        //creamos ese post con el método de mongoose create que nos permite pasarle un objeto de datos a ese modelo
        const newTrip = await Trip.create(req.body);
        res.json(newTrip); 
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' })

    }
})

//: para parte variable 
router.put('/:tripId', async (req, res) => {
        try {
            const tripEdit = await Trip.findByIdAndUpdate(
                req.params.tripId, //el ID que viene de la URL
                req.body, // el objeto con el que se actualiza el doc
                {new: true} //para que nos devuelva el nuevo objeto y no el anterior
            );
            res.json(tripEdit);
        } catch (error) {
            res.status(500).json({ error: 'Ha ocurrido un error' })
        }
   
})

module.exports = router;