const { Map } = require('immutable');

const error = -1;

const lettersSReducer = (weight) => {
    switch (weight) {
        case 1:
            return 0.55;
        case 2:
            return 0.70;
        case 3:
            return 0.85;
        case 4:
            return 1.00;
        default:
            return error;
    }
}

const lettersMReducer = (weight) => {
    switch (weight) {
        case 1:
            return 0.5;
        case 2:
            return 0.65;
        case 3:
            return 0.80;
        case 4:
            return 0.95;
        default:
            return error;
    }
}

const largeEnvelopeReducer = (weight) => {
    if (weight > 13) return error;
    return weight * 0.2 + 0.8;
}

const packageReducer = (weight) => {
    if (weight > 13) return error;
    if (weight <= 4) return 3.8;
    if (weight <= 8) return 4.6;
    if (weight <= 12) return 5.3;
    if (weight === 13) return 5.9;
}

const rateMap = Map({
    "Letters (Stamped)": lettersSReducer,
    "Letters (Metered)": lettersMReducer,
    "Large Envelopes (Flats)": largeEnvelopeReducer,
    "First-Class Package Service—Retail": packageReducer
})

function calculateRate(postage, weight) {
    if (weight <= 0) return 0;
    let ceilingWeight = Math.ceil(weight);

    try {
        return rateMap.get(postage)(ceilingWeight);
    } catch (e) {
        return error;
    }
}

module.exports = calculateRate;