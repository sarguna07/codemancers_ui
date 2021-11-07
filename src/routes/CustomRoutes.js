import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import {
    SignUp,
    LogIn,
} from "../views"
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route
                            path="/signup"
                            render={(props) => {
                                return <SignUp {...props} />;
                            }}
                        />

                        <Route
                            path="/login"
                            render={(props) => {
                                return <LogIn {...props} />;
                            }}
                        />

                        <Route to="*">
                            <Redirect to="/signup" />
                        </Route>
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
