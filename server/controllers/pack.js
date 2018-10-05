const db = require('../../database/index.js');

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

const deleteItem = (req,res) => {
	// const text = 'DELETE FROM $1 WHERE id = $2 AND trip_id = $3 RETURNING (id)'
	// const values = [req.params.type, req.body.item_id, req.body.trip_id]

	db.one(`DELETE FROM ${req.params.type} WHERE id = ${req.body.item_id} AND trip_id = ${req.body.trip_id} RETURNING (id)`)
		.then(result => {
			res.write(JSON.stringify(result));
			res.end();
		})
		.catch(error => {
			console.log(error)
		})
}

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
