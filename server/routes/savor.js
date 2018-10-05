const express = require('express');
const router = express.Router();
const savorController = require('../controllers/savor.js');

router.route('/:trip_id')
	.get(savorController.getPhotos);

module.exports = router;

