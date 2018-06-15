const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require('../database/index.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/trips', (req,res) => {
	db.many("SELECT * FROM public.trips")
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/shared/:trip', (req,res) => {
	db.many(`SELECT * FROM public.shared_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.location = '${req.params.trip}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/favor/:trip', (req,res) => {
	db.many(`SELECT * FROM public.favor_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.location = '${req.params.trip}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/personal/:trip', (req,res) => {
	db.many(`SELECT * FROM public.personal_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.location = '${req.params.trip}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

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

// app.post('/api/trips', function(req,res) {
// 	INSERT INTO trips (location, end_date, start_date) VALUES ('canada', '2018-01-11', '2018-01-19');
// })

module.exports = app;
