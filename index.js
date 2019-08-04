const nodePath = require('path');
const chokidar = require('chokidar');
const express = require('express');
const watch = nodePath.resolve('./api/');
const watcher = chokidar.watch(watch);
const server = express();

server.get('/', (req, res) => {
  res.send('Sauna Prototype');
});

server.use((req, res, next) => {
  require('./api/index.js')(req, res, next);
});

watcher.on('ready', () => {
  console.log('Hot reloading is now active.');
  watcher.on('all', (event, path) => {
    const relativePath = nodePath.relative(process.cwd(), path);
    console.log(`Reloading because of: ${relativePath} (${event})`);
    Object.keys(require.cache).forEach((id) => {
      if (/[/\\]api[/\\]/.test(id)) {
        delete require.cache[id];
      }
    });
  });
});

server.listen(3000);
console.log('Prototype listening on port 3000.');
