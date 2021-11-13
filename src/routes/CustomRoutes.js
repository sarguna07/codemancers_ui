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
    Solution,
    PageNotFound,
    Quiz
} from "../views"

import { isAuthenticated } from "../helpers";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: new URL(window.location.href).searchParams.get("name"),
            redirect: true
        };
    }

    render() {
        const { name, redirect } = this.state;

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

                        <Route
                            path="/quiz/solution"
                            render={(props) => {
                                if (redirect) {
                                    this.setState({ redirect: false });
                                    return <Redirect to={`/quiz/solution`} />;
                                }
                                if (name) {
                                    return <Solution {...props} name={name} />;
                                } else {
                                    return <PageNotFound {...props} />;
                                }
                            }}
                            exact
                        />
                        {isAuthenticated() && <Route
                            path="/quiz"
                            render={(props) => {
                                return <Quiz {...props} />;
                            }}
                            exact
                        />}
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
