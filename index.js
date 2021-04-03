// server
const restify = require('restify');

const updateRestStatus =  require('./updateRestStatus')

// add permition to CORS 
var cors = require('cors')

// Driver database
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

// connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'goomer'
    },
    acquireConnectionTimeout: 10000
});

updateRestStatus(knex)
setInterval(() => {
    updateRestStatus(knex)
}, 60000);

// Conf server
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(cors())

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// All restaurants
server.get('/restaurants', (req, res, next) => {
    knex('restaurante').then((restaurants) => {
        res.send(restaurants);
    }, next)
});

// One restaurant
server.get('/restaurant/:id', (req, res, next) => {
    const {id} = req.params
    knex('restaurante').where('restaurante_id', id).first().then((restaurant) => {
        !restaurant ? res.send('Nada encontrado') : res.send(restaurant);
    }, next)
});

// Create a restaurant
server.post('/create/restaurant', (req, res, next) => {
    knex('restaurante').insert(req.body).then((restaurant) => {
        !restaurant ? res.send('Erro ao cadastrar') : res.send('Dados cadastrados');
    }, next)
});

// Update a restaurant
server.put('/update/restaurant/:id', (req, res, next) => {
    const {id} = req.params
    knex('restaurante').where('restaurante_id', id).update(req.body).then((restaurant) => {
        !restaurant ? res.send('Nada encontrado') : res.send('Dados atualizados');
    }, next)
});

// Delete a restaurant
server.del('/delete/restaurant/:id', (req, res, next) => {
    const {id} = req.params
    knex('restaurante').where('restaurante_id', id).delete().then((restaurant) => {
        !restaurant ? res.send('Nada encontrado') : res.send('Dados excluídos');
    }, next)
});


// Time routes
// --------------------------------------------------------------

// All time of a restaurant
server.get('/times/:id', (req, res, next) => {
    const {id} = req.params
    knex('horario').where('horario_restaurante', id).then((time) => {
        res.send(time);
    }, next)
});

// recuperar a data pelo id, pelo dia || pelo horario atual

// Create a time
server.post('/create/time', (req, res, next) => {
    knex('horario').insert(req.body).then((time) => {
        !time ? res.send('Erro ao cadastrar') : res.send('Dados cadastrados');
    }, next)
});

// Update a time
server.put('/update/time/:id', (req, res, next) => {
    const {id} = req.params
    knex('horario').where('horario_id', id).update(req.body).then((time) => {
        !time ? res.send('Nada encontrado') : res.send('Dados atualizados');
    }, next)
});

// Delete a time
server.del('/delete/time/:id', (req, res, next) => {
    const {id} = req.params
    knex('horario').where('horario_id', id).delete().then((time) => {
        !time ? res.send('Nada encontrado') : res.send('Dados excluídos');
    }, next)
});


// Product routes
// --------------------------------------------------------------

// All products of a restaurant
server.get('/restaurant/products/:id', (req, res, next) => {
    const {id} = req.params
    knex('produto').where('produto_restaurante', id ).then((products) => {
        res.send(products);
    }, next)
});

// Get a product
server.get('/product/:id', (req, res, next) => {
    const {id} = req.params
    knex('produto').where('produto_id', id).first().then((product) => {
        !product ? res.send('Nada encontrado') : res.send(product);
    }, next)
});

// Create a product
server.post('/create/product', (req, res, next) => {
    knex('produto').insert(req.body).then((product) => {
        res.send(product);
    }, next)
});

// Update a product
server.put('/update/product/:id', (req, res, next) => {
    const {id} = req.params
    knex('produto').where('produto_id', id).update(req.body).then((product) => {
        !product ? res.send('Nada encontrado') : res.send('Dados atualizados');
    }, next)
});

// Delete a product
server.del('/delete/product/:id', (req, res, next) => {
    const {id} = req.params
    knex('produto').where('produto_id', id).delete().then((product) => {
        !product ? res.send('Nada encontrado') : res.send('Dados excluídos');
    }, next)
});

