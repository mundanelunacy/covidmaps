import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

export const initialState = {
    searchForm: { input_address: "111 Falcon Road Livingston, NJ" },
    displayMap: {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    },
    query: {
        center: { lat: 35.6938, lng: 139.7034 }, // default Shinjuku
        radius: 1,
        incidents: []
    }
};

const searchFormReducer = (state = initialState.searchForm, action) => {
    if (action.type === "ADDRESS_SUBMIT") {
        return { ...state, input_address: action.input_address };
    }
    return state;
};

const displayMapReducer = (state = initialState.displayMap, action) => {
    if (action.type === "MARKER_SELECT") {
        return { ...state, selectedPlace: action.payload.props, activeMarker: action.payload.marker, showingInfoWindow: true };
        // return { ...state, ...action.payload };
    }
    if (action.type === "MARKER_CLEAR") {
        return { ...state, activeMarker: null, showingInfoWindow: false };
    }
    return state;
};

const queryReducer = (state = initialState.query, action) => {
    if (action.type === "CENTER_MOVED") {
        return { ...state, ...action.query };
    }
    if (action.type === "QUERY_INCIDENTS") {
        return { ...state, ...action.query };
    }
    return state;
};

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    searchForm: searchFormReducer,
    displayMap: displayMapReducer,
    query: queryReducer
});
