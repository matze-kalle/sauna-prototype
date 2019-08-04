const express = require('express');
const sauna = require('./dist/sauna.js');
const server = express();

sauna(server, './api/', ['index.js']);

server.listen(3000);
console.log('Prototype listening on port 3000.');
