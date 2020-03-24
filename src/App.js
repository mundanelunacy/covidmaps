import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { GeoPointQuery } from "./components/GeoPointQuery";
// import { TakeoutParser } from "./components/TakeoutParser";

const App = props => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <GeoPointQuery></GeoPointQuery>
                {/* <TakeoutParser /> */}
            </ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default App;
