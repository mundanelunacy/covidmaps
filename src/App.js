import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { TestLP } from "./pages/TestLP";
import { GeoPointQuery } from "./components/GeoPointQuery";
import { TakeoutParser } from "./components/TakeoutParser";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = props => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={TestLP} />
                        <Route exact path="/map" component={GeoPointQuery} />
                        <Route exact path="/submit" component={TakeoutParser} />
                    </Switch>
                </Router>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default App;
