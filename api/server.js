const express = require('express'); // importing a CommonJS module

const morgan = require('morgan');//logs server usage to the console!!

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function customMorgan(req, res, next){
  console.log(`you made a ${req.method} request!!`);
  next();
}

server.use(express.json());

server.use(morgan('dev'));

server.use(customMorgan);//does not need to be invoked because it ITSELF is a middleware

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Hubs API</h2>
    <p>Welcome to the Hubs API</p>
  `);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;
