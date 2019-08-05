const nodePath = require('path');
const chokidar = require('chokidar');

module.exports = (expressApp, watchPath, requires) => {
  const resolvedWatchPath = nodePath.resolve(watchPath);
  const relativeWatchPath = nodePath.relative(process.cwd(), resolvedWatchPath);
  const watchPathRegExp = new RegExp(`[/\\\\]${relativeWatchPath}[/\\\\]`);
  const watcher = chokidar.watch(resolvedWatchPath);

  requires.forEach((file) => {
    const filePath = nodePath.resolve(watchPath, file);

    expressApp.use((req, res, next) => {
      require(filePath)(req, res, next);
      next();
    });
  });

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
