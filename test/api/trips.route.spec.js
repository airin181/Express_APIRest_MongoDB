//SUPERTEST:
// ---> nos lanza estas peticiones de manera fácil en vez de usar axios

const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');


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

    // --> comprobar si la URL funciona y si me devuelve lo que queremos
    describe('GET /api/trips', () => {

// ----------

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

    // --> DESPUÉS DE LOS TESTS:  desconexión bbdd

    afterAll(async ()=>{
        await mongoose.disconnect();
    })

})