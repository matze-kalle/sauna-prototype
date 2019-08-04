const nodePath = require('path');
const chokidar = require('chokidar');
const watch = nodePath.resolve('./api/');
const watcher = chokidar.watch(watch);

module.exports = () => {
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
};
