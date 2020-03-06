import React, { useState } from 'react';
import axios from 'axios';

import Dropdown from '../../common/Dropdown';
import { postage, error as e } from './Constants';

export default function PostalRateCalculator() {
    const [weight, setWeight] = useState(0);
    const [selectedPostage, setSelectedPostage] = useState(null);
    const [rate, setRate] = useState(0);
    const [showRate, setShowRate] = useState(false);
    const [error, setError] = useState(false);

    const handleCalculateClick = () => {
        axios.post("/api/week09/prove", {
            postage: selectedPostage,
            weight
        }).then(res => {
            let calculatedRate = res.data.response;
            if (calculatedRate === e) return setError(true);
            setError(false);
            setRate(calculatedRate);
            setShowRate(true);
        });
    }

    const handleBackClick = () => {
        setWeight(0);
        setShowRate(false)
    }

    return (
        <div className="container">
            <div className="section">
                <div className="title">
                    Postal Rate Calculator
                </div>
                {showRate === false &&
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        placeholder="Weight"
                                        value={weight}
                                        onChange={(e) => { setWeight(e.target.value) }}
                                        min="0"
                                    />
                                </div>
                            </div>
                            <Dropdown
                                list={postage}
                                onSelect={(item) => { setError(false); setSelectedPostage(item); }}
                            >
                            </Dropdown>
                        </div>
                        <div className="column">
                            <div className="field">
                                <button className="button is-primary" onClick={handleCalculateClick}>Calculate</button>
                            </div>
                            {error === true &&
                                <div className="field">
                                    <div className="notification is-danger">That weight is not availible for {selectedPostage}</div>
                                </div>
                            }
                        </div>
                    </div>
                }
                {showRate === true &&
                    <div className="columns">
                        <div className="column">
                            <div className="subtitle">
                                Rate: ${rate.toFixed(2)}
                            </div>
                        </div>
                        <div className="column">
                            <button className="button" onClick={handleBackClick}>Back</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}