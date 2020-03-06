const express = require('express');
const router = express.Router();

const postalRateCalculatorController = require('./week09/prove/PostalRateCalculatorController');

router.post('/week09/prove', postalRateCalculatorController);

module.exports = router;