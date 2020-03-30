import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { getTzString } from "../utilities/timeUtils";

export const initialState = {
    displayMap: {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    },
    query: {
        center: { lat: 35.689, lng: 139.703 }, // default Shinjuku
        radius: 1,
        incidents: []
    },
    timezone: { tzString: getTzString() },
    parser: {
        placeVisits: []
    },
    manualInputBuffer: {
        startTimestampMs: 0,
        endTimestampMs: 0,
        address: "",
        name: "",
        placeId: "",
        position: {},
        validated: false
    },

    manualInputForm: {
        inputValue: "",
        inputDate: new Date(2020, 0, 1),
        inputDuration: 30
    },

    databaseStaging: {
        incidents: []
    }
};

const displayMapReducer = (state = initialState.displayMap, action) => {
    if (action.type === "MARKER_SELECT") {
        return {
            ...state,
            selectedPlace: action.payload.props,
            activeMarker: action.payload.marker,
            showingInfoWindow: true
        };
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

const manualInputBufferReducer = (state = initialState.manualInputBuffer, action) => {
    if (action.type === "ADD_MANUAL_PLACE_TO_BUFFER") {
        return {
            ...state,
            ...action.place
        };
    }
    if (action.type === "ADD_MANUAL_TIME_TO_BUFFER") {
        return {
            ...state,
            ...action.time
        };
    }
    if (action.type === "CLEAR_MANUAL_INPUT") {
        return {
            ...state,
            ...initialState.manualInputBuffer
        };
    }
    return state;
};

const manualInputFormReducer = (state = initialState.manualInputForm, action) => {
    if (action.type === "SET_MANUAL_INPUT_VALUE") {
        return {
            ...state,
            inputValue: action.inputValue
        };
    }
    if (action.type === "SET_MANUAL_INPUT_DATE") {
        return {
            ...state,
            inputDate: action.inputDate
        };
    }
    if (action.type === "SET_MANUAL_INPUT_DURATION") {
        return {
            ...state,
            inputDuration: action.inputDuration
        };
    }
    if (action.type === "CLEAR_MANUAL_INPUT") {
        return {
            ...state,
            ...initialState.manualInputForm
        };
    }
    return state;
};

const databaseStagingReducer = (state = initialState.databaseStaging, action) => {
    if (action.type === "ADD_BUFFER_TO_STAGING") {
        return {
            ...state,
            incidents: [...state.incidents, ...[action.buffer]]
        };
    }
    if (action.type === "CLEAR_STAGING") {
        return {
            ...state,
            ...initialState.databaseStaging
        };
    }
    return state;
};

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    displayMap: displayMapReducer,
    query: queryReducer,
    timezone: timeZoneReducer,
    parser: parserReducer,
    manualInputBuffer: manualInputBufferReducer,
    manualInputForm: manualInputFormReducer,
    databaseStaging: databaseStagingReducer
});
