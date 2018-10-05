const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips.js');

router.route('/')
	.get(tripsController.getTrips);

router.route('/')
	.post(tripsController.addTrip);

router.route('/')
	.delete(tripsController.deleteTrip);

module.exports = router;
