const express = require('express'); // importing a CommonJS module

const morgan = require('morgan');//logs server usage to the console!!

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function customMorgan(req, res, next){
  console.log(`you made a ${req.method} request!!`);
  next();
}

function shortCircuit(req, res, next){
  res.json(`the request was short curcuited!!!!`);

}

function addFriend(req, res, next){
  req.friend = 'Lady Gaga';
  next();
}

server.use(express.json());

server.use(morgan('dev'));

server.use(customMorgan);//does not need to be invoked because it ITSELF is a middleware

// server.use(shortCircuit);//short circuits the request so that you never see what the server was sending back to you. If it is moved above the morgan you won't even see anything printed out into the server console.

server.use(addFriend);//adds a friend to the req object! can be seen once the server throws back the information to you.

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Hubs ${req.friend} API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
