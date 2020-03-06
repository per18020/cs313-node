const calculateRate = require('./CalculateRate');

function postalRateCalculatorController(req, res) {
    let postage = req.body.postage;
    let weight = req.body.weight;
    res.json({
        response: calculateRate(postage, weight)
    });
}

module.exports = postalRateCalculatorController;