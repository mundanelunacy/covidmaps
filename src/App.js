import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { TestLP } from "./pages/TestLP";
import { LandingPage } from "./pages/LandingPage";
import { Submit } from "./pages/Submit";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./config/material-ui";
import { GetBrowserPosition } from "./components/GetBrowserPosition";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = (props) => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <MuiThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/submit" component={Submit} />
                            <Route exact path="/test" component={TestLP} />
                        </Switch>
                    </Router>
                    <GetBrowserPosition />
                </MuiThemeProvider>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default App;
