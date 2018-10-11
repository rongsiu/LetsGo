const db = require('../../database/index.js');

const deleteTrip = (req,res) => {
	db.one(`DELETE FROM trips WHERE id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

const addTrip = (req,res) => {
	db.one(`INSERT INTO trips (trip, end_date, start_date) VALUES ('${req.body.trip}', '${req.body.start_date}', '${req.body.end_date}') RETURNING (id, trip, end_date, start_date)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

const getTrips = (req,res) => {
	db.many("SELECT * FROM public.trips")
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

module.exports = { deleteTrip, addTrip, getTrips};