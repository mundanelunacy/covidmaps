import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

export const initialState = {
    searchForm: { input_address: "111 Falcon Road Livingston, NJ" }
};

const searchFormReducer = (state = initialState.searchForm, action) => {
    if (action.type === "ADDRESS_SUBMIT") {
        return { ...state, input_address: action.input_address };
    }
    return state;
};

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    searchForm: searchFormReducer
});
