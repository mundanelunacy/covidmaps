import React from "react";
import { Provider } from "react-redux";
import { store, rrfProps } from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const App = props => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>hello world</ReactReduxFirebaseProvider>
        </Provider>
    );
};

export default App;
