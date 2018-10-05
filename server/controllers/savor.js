const db = require('../../database/index.js');

//SAVOR
// app.get('/api/savor/:trip_id', 
const getPhotos = (req,res) => {
	db.many(`SELECT photo, trip_id FROM public.photos WHERE trip_id=${req.params.trip_id}`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

module.exports = { getPhotos };


