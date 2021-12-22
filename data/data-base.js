'use strict';

const { MongoClient } = require('mongodb');
const { DB_URL } = require('../env');

const client = new MongoClient(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function getCells() {
  try {
    await client.connect();
    
    const db = await client.db('football-tickets');
    const cells = await db.collection('cells');
    
    const data = await cells.find({}).toArray();
    await client.close();
    
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function getPlaces(cellId) {
  try {
    await client.connect();
    const db = await client.db('football-tickets');
    const places = await db.collection('places');
    
    const data = await places.find({ cellId }).toArray();
    await client.close();
    
    return data;
  } catch (e) {
    console.error(e);
  }
}

async function updatePlace(cellId, id) {
  try {
    await client.connect();
    const db = await client.db('football-tickets');
    const places = await db.collection('places');
    
    await places.updateOne({ cellId, id }, { $set: { sold: true } });
    await client.close();
  } catch (e) {
    console.error(e);
  }
}

async function fillData() {
  try {
    await client.connect();
    const db = await client.db('football-tickets');
    const places = await db.collection('places');
    
    const cellsCol = await db.collection('cells');
    const cells = await cellsCol.find({}).toArray();
    for (const cell of cells) {
      const temp = [];
      for (let i = 1; i < 253; i++) {
        temp.push({
          cellId: cell.id,
          id: i,
          price: cell.price,
          sold: cell.soldOut ? true : !!Math.round(Math.random()),
        });
      }
      await places.insertMany(temp);
    }
    await client.close();
    
  } catch (e) {
    console.error(e);
  }
}


module.exports = {
  getCells,
  getPlaces,
  updatePlace,
};
