const express = require('express');
const router = express.Router();
const { launchUserWebsite } = require('../controllers/deployController');

router.post('/launch', launchUserWebsite);

module.exports = router;
