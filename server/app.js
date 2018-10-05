const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');
const tripsRouter = require('./routes/trips.js');
const packRouter = require('./routes/pack.js');
const savorRouter = require('./routes/savor.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/api/trips', tripsRouter);
app.use('/api/pack', packRouter);
app.use('/api/savor', savorRouter);

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/../sw.js'));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = app;
