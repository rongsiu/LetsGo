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

app.get('/api/shared/:trip_id', (req,res) => {
	db.many(`SELECT * FROM public.shared_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = ${req.params.trip_id}`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/favor/:trip_id', (req,res) => {
	db.many(`SELECT * FROM public.favor_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/personal/:trip_id', (req,res) => {
	db.many(`SELECT * FROM public.personal_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
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

app.post('/api/trips', function(req,res) {
	// console.log(new Date(req.body.start), new Date(req.body.end)) UPDATE HARDCODED DATE
	db.one(`INSERT INTO trips (trip, end_date, start_date) VALUES ('${req.body.trip}', '2018-05-20', '2018-05-25') RETURNING (id, trip, end_date, start_date)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.post('/api/pack/:type', function(req,res) {
	req.params.type = 'personl_items' ?
	db.one(`INSERT INTO ${req.params.type} (trip_id, item) VALUES ('${req.body.trip_id}', '${req.body.item}') RETURNING (item)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
	:
	db.one(`INSERT INTO ${req.params.type} (trip_id, item, added_by) VALUES ('${req.body.trip_id}', '${req.body.item}', '${req.body.added_by}') RETURNING (item)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

//DELETE TRIP NOT WORKING
app.delete('/api/trips', function(req,res) {
	console.log('body', req.body)
	db.one(`DELETE FROM trips WHERE trip = '${req.body}'`)
		.then(result => {
			console.log('server', result)
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

module.exports = app;
