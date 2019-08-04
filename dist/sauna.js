const nodePath = require('path');
const chokidar = require('chokidar');

module.exports = (watchPath) => {
  const resolvedWatchPath = nodePath.resolve(watchPath);
  const relativeWatchPath = nodePath.relative(process.cwd(), resolvedWatchPath);
  const watchPathRegExp = new RegExp(`[/\\\\]${relativeWatchPath}[/\\\\]`);
  const watcher = chokidar.watch(resolvedWatchPath);

  watcher.on('ready', () => {
    console.log(`Hot reloading is now active for: ${relativeWatchPath}`);
    watcher.on('all', (event, path) => {
      const relativePath = nodePath.relative(process.cwd(), path);

      console.log(`Reloading because of: ${relativePath} (${event})`);
      Object.keys(require.cache).forEach((id) => {
        if (watchPathRegExp.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
};
