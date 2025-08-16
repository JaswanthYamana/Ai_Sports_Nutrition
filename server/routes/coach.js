const express = require('express');
const router = express.Router();

// Basic coach routes - can be expanded later
router.get('/', (req, res) => {
  res.json({ message: 'Coach routes working' });
});

module.exports = router;