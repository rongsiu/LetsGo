const db = require('../../database/index.js');

//app.get('/api/pack/shared/:trip_id',


 const getSharedItems = (req,res) => {
	db.many(`SELECT s.id, s.item, s.claimed_by FROM public.shared_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = ${req.params.trip_id}`)
		.then(result => {
			console.log(result)
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

// app.get('/api/pack/favor/:trip_id', 

const getFavorItems = (req,res) => {
	db.many(`SELECT s.id, s.item, s.claimed_by, s.added_by FROM public.favor_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

// app.get('/api/pack/personal/:trip_id', 

const getPersonalItems = (req,res) => {
	db.many(`SELECT s.id, s.item, s.trip_id FROM public.personal_items s JOIN public.trips t ON s.trip_id = t.id WHERE t.id = '${req.params.trip_id}'`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

// app.post('/api/pack/:type', function

const addItem = (req,res) => {
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
}

// app.delete('/api/pack/:type', function

const deleteItem = (req,res) => {
	db.one(`DELETE FROM ${req.params.type} WHERE id = ${req.body.item_id} AND trip_id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

//update item

// app.patch('/api/pack/claim/:type', function

const claimItem = (req,res) => {
	db.one(`UPDATE ${req.params.type} SET claimed_by='${req.body.claimed_by}' WHERE id=${req.body.id} AND trip_id=${req.body.trip_id} RETURNING (id, claimed_by)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}


// app.patch('/api/pack/unclaim/:type', function

const unclaimItem = (req,res) => {
	db.one(`UPDATE ${req.params.type} SET claimed_by=NULL WHERE id=${req.body.id} AND trip_id=${req.body.trip_id} RETURNING (id, claimed_by)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

module.exports = { getSharedItems, getFavorItems, getPersonalItems, addItem, deleteItem, claimItem, unclaimItem };
