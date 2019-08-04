const { Router } = require('express');
const about = require('./about.js');
const lorem = require('./lorem.js');
const ipsum = require('./ipsum.js');
const router = new Router();

router.get('/', (req, res) => {
  res.send('Sauna Prototype');
});

router.get('/about', about);
router.get('/lorem', lorem);
router.get('/ipsum', ipsum);

module.exports = router;
