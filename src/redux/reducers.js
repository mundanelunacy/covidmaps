import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { getTzString } from "../utilities/timeUtils";
import { createTodayTs } from "../utilities/timeUtils";
import { QUERY_INIT_RADIUS, DISPLAY_MAP_INIT_ZOOM } from "../config/constants";
import * as actions from "./types";

export const initialState = {
    query: {
        center: { lat: 37.5172, lng: 127.0473 }, // default Gangnam
        radius: QUERY_INIT_RADIUS,
        incidents: [],
    },
    timezone: { tzString: getTzString() },
    parser: {
        placeVisits: [],
    },
    manualInputBuffer: {
        startTimestampMs: 0,
        endTimestampMs: 0,
        address: "",
        name: "",
        placeId: "",
        position: {},
        validated: false,
    },

    manualInputForm: {
        inputValue: "",
        inputDate: createTodayTs(getTzString()),
        inputDuration: 30,
    },
    databaseStaging: {
        count: 0,
        incidents: [],
    },
    displayMap: {
        zoom: DISPLAY_MAP_INIT_ZOOM,
    },
    topBar: {
        drawer: false,
    },
    filter: {
        verified: false,
    },
    submitPage: {
        submittedPlaces: 0,
    },
};

const queryReducer = (state = initialState.query, action) => {
    if (action.type === actions.CENTER_MOVED) {
        return { ...state, ...action.query };
    }
    if (action.type === actions.QUERY_INCIDENTS) {
        return { ...state, ...action.query };
    }
    return state;
};

const timeZoneReducer = (state = initialState.timezone, action) => {
    if (action.type === actions.CHANGE_TIMEZONE) {
        return {
            ...state,
            tzString: action.tzString,
        };
    }
    return state;
};

const parserReducer = (state = initialState.parser, action) => {
    if (action.type === actions.LOAD_VISITS) {
        return {
            ...state,
            placeVisits: action.placeVisits,
        };
    }
    if (action.type === actions.PARSER_CLEAR) {
        return {
            ...state,
            placeVisits: [],
        };
    }
    return state;
};

const manualInputBufferReducer = (state = initialState.manualInputBuffer, action) => {
    if (action.type === actions.ADD_MANUAL_PLACE_TO_BUFFER) {
        return {
            ...state,
            ...action.place,
        };
    }
    if (action.type === actions.ADD_MANUAL_TIME_TO_BUFFER) {
        return {
            ...state,
            ...action.time,
        };
    }
    if (action.type === actions.CLEAR_MANUAL_INPUT) {
        return {
            ...state,
            ...initialState.manualInputBuffer,
        };
    }
    return state;
};

const manualInputFormReducer = (state = initialState.manualInputForm, action) => {
    if (action.type === actions.SET_MANUAL_INPUT_VALUE) {
        return {
            ...state,
            inputValue: action.inputValue,
        };
    }
    if (action.type === actions.SET_MANUAL_INPUT_DATE) {
        return {
            ...state,
            inputDate: action.inputDate,
        };
    }
    if (action.type === actions.SET_MANUAL_INPUT_DURATION) {
        return {
            ...state,
            inputDuration: action.inputDuration,
        };
    }
    if (action.type === actions.CLEAR_MANUAL_INPUT) {
        return {
            ...state,
            ...initialState.manualInputForm,
        };
    }
    return state;
};

const databaseStagingReducer = (state = initialState.databaseStaging, action) => {
    if (action.type === actions.ADD_BUFFER_TO_STAGING) {
        return {
            ...state,
            incidents: [...state.incidents, ...[action.buffer]],
        };
    }
    if (action.type === actions.CLEAR_STAGING) {
        return {
            ...state,
            ...initialState.databaseStaging,
        };
    }
    if (action.type === actions.IMPORT_TAKEOUT_TO_STAGING) {
        return {
            ...state,
            incidents: [...state.incidents, ...action.incidents],
        };
    }
    if (action.type === actions.DELETE_FROM_STAGING) {
        const newState = state;
        newState.incidents.splice(action.index, 1);
        return {
            ...state,
            incidents: [...newState.incidents],
        };
    }
    return state;
};

const displayMapReducer = (state = initialState.displayMap, action) => {
    if (action.type === actions.SET_ZOOM) {
        return {
            ...state,
            zoom: action.zoom,
        };
    }
    return state;
};

const topBarReducer = (state = initialState.topBar, action) => {
    if (action.type === actions.SET_DRAWER) {
        return {
            ...state,
            drawer: action.drawer,
        };
    }
    return state;
};

const filterReducer = (state = initialState.filter, action) => {
    if (action.type === actions.SET_VERIFIED_FILTER) {
        return {
            ...state,
            verified: action.verified,
        };
    }
    return state;
};

const submitPageReducer = (state = initialState.submitPage, action) => {
    if (action.type === actions.DISPLAY_UPLOAD_CONFIRMATION) {
        return {
            ...state,
            submittedPlaces: action.submittedPlaces,
        };
    }
    return state;
};

export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    query: queryReducer,
    timezone: timeZoneReducer,
    parser: parserReducer,
    manualInputBuffer: manualInputBufferReducer,
    manualInputForm: manualInputFormReducer,
    databaseStaging: databaseStagingReducer,
    displayMap: displayMapReducer,
    topBar: topBarReducer,
    filter: filterReducer,
    submitPage: submitPageReducer,
});
