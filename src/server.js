const path = require('path');
const express = require('express');
const router = require('./lib/router');
require('dotenv').config()

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(express.static('dist/app'));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/app/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
