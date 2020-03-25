import React, { Component } from "react";
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "./components/layout/Nav";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    {/* <Switch>
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    </Switch> */}
                </div>
            </Router>

        );
    }
}

export default App;
