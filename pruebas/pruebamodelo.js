 const mongoose = require('mongoose');

 const Trip = require('../models/trip.model');


 (async () => {
    await mongoose.connect ('mongodb://127.0.0.1/familyTrips')
    const newTrip = await Trip.create({
        name: ' prueba de viaje',
        decription: 'prueba descripcion',
        destination: 'oclajoma',
        category: 'amigos',
        start_date: '2022-05-03',
    });

    console.log(newTrip);
 })();