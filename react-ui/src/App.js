import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.scss';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route component={RedirectToHome} />
            </Switch>
        </Router>
    );
}

function RedirectToHome() {
    window.location.href = "https://thawing-inlet-31036.herokuapp.com/";
    return null;
}