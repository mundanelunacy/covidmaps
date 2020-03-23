import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { GeoPointQuery } from "./components/GeoPointQuery";

const App = props => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <GeoPointQuery></GeoPointQuery>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default App;
