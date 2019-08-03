const { Router } = require('express');
const router = new Router();

router.get('/about', (req, res, next) => {
  res.send('Prototype for server-side hot reloading.');
});

module.exports = router;
