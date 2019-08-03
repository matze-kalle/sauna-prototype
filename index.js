const path = require('path');
const chokidar = require('chokidar');
const express = require('express');
const watch = path.resolve('./api/');
const watcher = chokidar.watch(watch);
const server = express();

server.get('/', (req, res) => {
  res.send('Sauna Prototype');
});

server.use((req, res, next) => {
  require('./api/about.js')(req, res, next);
});

watcher.on('ready', () => {
  watcher.on('all', (event, path) => {
    console.log(event, path);
    Object.keys(require.cache).forEach((id) => {
      if (/[/\\]api[/\\]/.test(id)) {
        delete require.cache[id];
      }
    });
  });
});

server.listen(3000);
console.log('Prototype listening on port 3000.');
