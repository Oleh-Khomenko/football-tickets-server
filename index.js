'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// data
const { getCells, getPlaces, updatePlace } = require('./data/data-base');

// data
const port = 7000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/cells', async (req, res) => {
  const cells = await getCells();
  const cellsData = [];
  for (let i = 0; i < 8; i++) {
    cellsData.push(cells.slice(i * 12, (i + 1) * 12));
  }
  res.send(cellsData);
});

app.get('/places', async (req, res) => {
  const { cellId } = req.query;
  const places = await getPlaces(+cellId);
  const placesData = [];
  try {
    for (let i = 0; i < 25; i++) {
      placesData.push(places.slice(i * 12, (i + 1) * 12));
    }
  } catch (e) {
    console.log(e);
  }
  res.send(placesData);
});

app.post('/buy', async (req, res) => {
  const { cellId, id } = req.body;
  console.log(req.body, '###');
  await updatePlace(cellId, id);
  
  res.send({ ok: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
