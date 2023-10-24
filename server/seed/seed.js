const db = require('../config/connection.js')
const { Adult, Animal, Child, Language, Score, User} = require('../models/index.js');
const cleanDB = require ('./cleanDB.js');

const adultData = require('./parentsDB.json');
const childData = require('./childrenDB.json');
const animalData = require('./animalDB.json');


db.once('open', async () => {
//  await cleanDB('Adult', 'adults');
//  await cleanDB('Child', 'children');
//  await cleanDB('Animal', 'animals')

  await Adult.insertMany(adultData);
  await Animal.insertMany(animalData);
  await Child.insertMany(childData);

  console.log('Database is now seeded!');
  process.exit(0);
});