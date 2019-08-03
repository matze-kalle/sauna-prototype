const express = require('express');
const server = express();

server.get('/', (req, res, next) => {
  res.send('Sauna Prototype');
});

server.listen(3000);
console.log('Prototype listening on port 3000.');
