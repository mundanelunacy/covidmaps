import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { getTzString } from "../utilities/timeUtils";

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
    },
    timezone: { tzString: getTzString() },
    parser: {
        placeVisits: []
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

const timeZoneReducer = (state = initialState.timezone, action) => {
    if (action.type === "CHANGE_TIMEZONE") {
        return {
            ...state,
            tzString: action.tzString
        };
    }
    return state;
};

const parserReducer = (state = initialState.parser, action) => {
    if (action.type === "LOAD_VISITS") {
        return {
            ...state,
            placeVisits: action.placeVisits
        };
    }
    if (action.type === "PARSER_CLEAR") {
        return {
            ...state,
            placeVisits: []
        };
    }
    return state;
};

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    searchForm: searchFormReducer,
    displayMap: displayMapReducer,
    query: queryReducer,
    timezone: timeZoneReducer,
    parser: parserReducer
});
