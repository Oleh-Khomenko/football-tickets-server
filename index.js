'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// data
const cellsData = require('./data/cells-data');

// data
const port = 7000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/cells', (req, res) => {
  res.send(cellsData);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
