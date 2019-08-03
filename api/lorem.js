const { Router } = require('express');
const router = new Router();

router.get('/lorem', (req, res) => {
  res.send('Lorem.');
});

module.exports = router;
