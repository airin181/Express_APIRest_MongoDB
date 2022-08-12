//SUPERTEST:
// ---> nos lanza estas peticiones de manera fácil en vez de usar axios

const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Trip = require('../../models/trip.model')


//---------



//DESCRIBE: 
// ---> definir pequeños grupos de pruebas para organizar como lanzamos las pruebas unitarias
    //1º argumento: nombre o descripcion de prueba general
    //2º argumento: función anónima.

describe('Pruebas sobre la API de trips', () => {

    // --> ANTES DE LOS TESTS:  conexión bbdd

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/familyTrips')
    })

    // --> DESPUÉS DE LOS TESTS:  desconexión bbdd
        
      afterAll(async ()=>{
        await mongoose.disconnect();
    })


    // ============  
    // TESTS:
    // --> comprobar si la URL funciona y si me devuelve lo que queremos 
    // ============  

    // --> GET
    describe('GET /api/trips', () => {

        let response;
        beforeEach(async () => {

            //aqui lanzamos la petición con supertest.
                //1º: request y nuestra app que queremos probar
                //2º: el verbo que queremos lanzar y la URL a la que queremos atacar
                //3º: llamamos al método send
                response = await request(app).get('/api/trips').send();
        })

// ----------
        
        //si me devuelve el status y el contenido que yo estoy esperando. Si va bien status 200 y contenido de trips con su json
        it('La ruta funciona', async () => {

    //LA PRUEBA:
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');

        })


// ----------
        it('La petición nos devuelve un array de trips', async () => {
            expect(response.body).toBeInstanceOf(Array);
          
        })

    });

    // --> POST
    describe('POST /api/trips', () => {

        // creamos datos con esquema para hacer prueba
        const newTrip = {name: 'test trip', destination: 'oklajoma', category: 'familiar', start_date:'2022-06-20'};

        const wrongTrip = {nombre: 'test trip'};

        //para no llenar la bbdd de KK
        afterAll(async() => {
            await Trip.deleteMany({name:'test trip'})
        })

        it('La ruta funciona', async () => {
            const response = await request(app).post('/api/trips').send(newTrip);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })

        it('Se inserta correctamente', async () => {
            const response = await request(app).post('/api/trips').send(newTrip);

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newTrip.name)

        })

        it('Error en la inserción', async() => {
            const response = await request(app).post('/api/trips').send(wrongTrip);

            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();

        })
    })

    // --> PUT
    describe('PUT /api/trips', () => {

        let trip;

        beforeEach(async() =>{
            trip = await Trip.create({ name: 'test trip', destination: 'Berlin', category: 'amigos', start_date: '2022-06-07'});
        });

        afterEach(async () =>{
            await Trip.findByIdAndDelete(trip._id);
        });


        it('La ruta funciona', async () => {
            const response = await request(app).put(`/api/trips/${trip._id}`).send({
                name: 'trip updated'
            });

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');

        })

        it('Se actualiza correctamente', async () => {
            const response = await request(app).put(`/api/trips/${trip._id}`).send({
                name: 'trip updated'
            });

            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('trip updated');

        })

    })

    // --> DELETE
    describe('DELETE /api/trips', () => {

        let trip;
        let response;

        beforeEach(async() => {
            trip = await Trip.create({ name: 'test trip to be deleted', destination: 'Berlin', category: 'familiar', start_date: '2022-06-07'});

            response = await request(app).delete(`/api/trips/${trip._id}`).send();
        });


        it('La ruta funciona', async () => {

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');

        })

        it('Se borra correctamente', async () => {

            expect(response.body._id).toBeDefined();

            const foundTrip = await Trip.findById(trip._id);
            expect(foundTrip).toBeNull;

        })
        
    })

})