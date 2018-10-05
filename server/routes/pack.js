const express = require('express');
const router = express.Router();
const packController = require('../controllers/pack.js');

router.route('/shared/:trip_id')
	.get(packController.getSharedItems);

router.route('/favor/:trip_id')
	.get(packController.getFavorItems);

router.route('/personal/:trip_id')
	.get(packController.getPersonalItems);

router.route('/:type')
	.post(packController.addItem);

router.route('/:type')
	.delete(packController.deleteItem);

router.route('/claim/:type')
	.patch(packController.claimItem);

router.route('/unclaim/:type')
	.patch(packController.unclaimItem);

module.exports = router;


