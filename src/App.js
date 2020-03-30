import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { TestLP } from "./pages/TestLP";
import { GeoPointQuery } from "./components/GeoPointQuery";
// import { TakeoutParser } from "./components/TakeoutParser";
import { LandingPage } from "./pages/LandingPage";
import { Submit } from "./pages/Submit";
import { SearchForm } from "./components/SearchForm";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./config/material-ui";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = props => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <MuiThemeProvider theme={theme}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={TestLP} />
                            <Route exact path="/map" component={GeoPointQuery} />
                            <Route exact path="/submit" component={Submit} />
                            <Route exact path="/lp" component={LandingPage} />
                            <Route exact path="/search" component={SearchForm} />
                        </Switch>
                    </Router>
                </MuiThemeProvider>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default App;
