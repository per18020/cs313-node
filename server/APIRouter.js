const express = require('express');
const router = express.Router();

const postalRateCalculatorController = require('./week09/prove/PostalRateCalculatorController');
const familyHistoryRouter = require('./week10/team/familyHistoryRouter');

router.post('/week09/prove', postalRateCalculatorController);
router.use('/week10/team', familyHistoryRouter);

module.exports = router;