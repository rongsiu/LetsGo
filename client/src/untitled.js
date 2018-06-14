const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/letsgo';

const db = mongoose.connect(mongoUri);

const tripSchema = new mongoose.Schema({
  location: String,
  start_date: Date,
  end_date: Date,
});

const Trips = mongoose.model('trips', tripSchema);

const itemSchema = new mongoose.Schema({
  location: String,
});

const Items = mongoose.model('trips', itemSchema);

module.exports.Trips = Trips;

