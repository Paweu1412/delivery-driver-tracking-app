const express = require('express');
const router = express.Router();

// GET

router.get('/hello', async (_req, res) => {
  res.status(200).json({ message: 'Hello Wodsadrld!' });
});

// POST

module.exports = router;