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

//TRIPS

app.delete('/api/trips/delete', function(req,res) {
	db.one(`DELETE FROM trips WHERE id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.post('/api/trips/add', function(req,res) {
	db.one(`INSERT INTO trips (trip, end_date, start_date) VALUES ('${req.body.trip}', '${req.body.start_date}', '${req.body.end_date}') RETURNING (id, trip, end_date, start_date)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

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

//PACK

app.get('/api/pack/shared/:trip_id', (req,res) => {
	db.many(`SELECT s.id, s.item, s.claimed_by FROM public.shared_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = ${req.params.trip_id}`)
		.then(result => {
			console.log(result)
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/pack/favor/:trip_id', (req,res) => {
	db.many(`SELECT s.id, s.item, s.claimed_by, s.added_by FROM public.favor_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.get('/api/pack/personal/:trip_id', (req,res) => {
	db.many(`SELECT s.id, s.item, s.trip_id FROM public.personal_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.post('/api/pack/add/:type', function(req,res) {
	req.params.type === 'personal_items' ?
	db.one(`INSERT INTO ${req.params.type} (trip_id, item) VALUES (${req.body.trip_id}, '${req.body.item}') RETURNING (item, id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
	:
	db.one(`INSERT INTO ${req.params.type} (trip_id, item, added_by) VALUES (${req.body.trip_id}, '${req.body.item}', '${req.body.added_by}') RETURNING (item, id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.delete('/api/pack/delete/:type', function(req,res) {
	db.one(`DELETE FROM ${req.params.type} WHERE id = ${req.body.item_id} AND trip_id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.patch('/api/pack/claim/:type', function(req,res) {
	db.one(`UPDATE ${req.params.type} SET claimed_by='${req.body.claimed_by}' WHERE id=${req.body.id} AND trip_id=${req.body.trip_id} RETURNING (id, claimed_by)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

app.patch('/api/pack/unclaim/:type', function(req,res) {
	db.one(`UPDATE ${req.params.type} SET claimed_by=NULL WHERE id=${req.body.id} AND trip_id=${req.body.trip_id} RETURNING (id, claimed_by)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
})

//SAVOR

app.get('/api/savor/:trip_id', (req,res) => {
	db.many(`SELECT photo, trip_id FROM public.photos WHERE trip_id=${req.params.trip_id}`)
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

module.exports = app;
