const express = require('express');
const sauna = require('./dist/sauna.js');
const server = express();

server.use((req, res, next) => {
  require('./api/index.js')(req, res, next);
});

sauna('./api/');

server.listen(3000);
console.log('Prototype listening on port 3000.');
