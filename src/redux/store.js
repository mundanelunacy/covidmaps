import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createFirestoreInstance } from "redux-firestore";
import { initialState, rootReducer } from "./reducers";
import { firebaseConfig } from "../config/firebaseConfig";
import { rrfConfig } from "../config/rrfConfig";
import thunk from "redux-thunk";

//Firebase initializations
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
firebase.initializeApp(firebaseConfig);

// For <Provider> (Redux)
export const store = createStore(rootReducer, initialState, process.env.NODE_ENV === "development" ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk));

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};
