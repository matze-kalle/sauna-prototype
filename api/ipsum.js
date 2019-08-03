const { Router } = require('express');
const router = new Router();

router.get('/ipsum', (req, res) => {
  res.send('Ipsum.');
});

module.exports = router;
