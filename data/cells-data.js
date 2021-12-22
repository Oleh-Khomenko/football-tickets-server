'use strict'
const prices = require('./prices');
const colors = require('./colors');

const cellsData = [];

function matchLow(i, j) {
  return i < 2 && j < 2 || i < 2 && j > 9 || i > 5 && j < 2 || i > 5 && j > 9;
}

function matchMedium(i, j) {
  return i > 1 && i < 6 && j < 2 || i > 1 && i < 6 && j > 9;
}

function matchPremium(i, j) {
  return i === 1 && j > 2 && j < 9 || i === 6 && j > 2 && j < 9;
}

let counter = 0;
for (let i = 0; i < 8; i++) {
  const temp = [];
  for (let j = 0; j < 12; j++) {
    counter += 1;
    let color = colors.COLOR_HIGH;
    let price = prices.HIGH;
    if (matchLow(i, j)) {
      color = colors.COLOR_LOW;
      price = prices.LOW;
    }
    if (matchMedium(i, j)) {
      color = colors.COLOR_MEDIUM;
      price = prices.MEDIUM;
    }
    if (matchPremium(i, j)) {
      color = colors.COLOR_PREMIUM;
      price = prices.PREMIUM;
    }
    temp.push(
      {
        id: counter,
        price: price,
        color: color,
        soldOut: !!Math.round(Math.random()),
      }
    );
  }
  cellsData.push(temp);
}
console.log(cellsData);

module.exports = {
  cellsData,
}
