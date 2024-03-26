const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Welcome to Rentify!, our community-based sharing platform');
});

module.exports = router;
