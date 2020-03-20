import React from "react";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { BrowserRouter as Router } from "react-router-dom";
import { store, rrfProps } from "../../redux/store";

const withProvider = story => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <Router>{story()}</Router>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default withProvider;
