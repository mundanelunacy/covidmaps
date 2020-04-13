import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { getTzString } from "../utilities/timeUtils";

export const initialState = {
    query: {
        center: { lat: 37.5172, lng: 127.0473 }, // default Gangnam
        radius: 5,
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
        inputDate: new Date(),
        inputDuration: 30,
    },
    databaseStaging: {
        count: 0,
        incidents: [],
    },
    displayMap: {
        zoom: 14,
    },
    topBar: {
        drawer: false,
    },
    filter: {
        verified: true,
    },
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
            tzString: action.tzString,
        };
    }
    return state;
};

const parserReducer = (state = initialState.parser, action) => {
    if (action.type === "LOAD_VISITS") {
        return {
            ...state,
            placeVisits: action.placeVisits,
        };
    }
    if (action.type === "PARSER_CLEAR") {
        return {
            ...state,
            placeVisits: [],
        };
    }
    return state;
};

const manualInputBufferReducer = (state = initialState.manualInputBuffer, action) => {
    if (action.type === "ADD_MANUAL_PLACE_TO_BUFFER") {
        return {
            ...state,
            ...action.place,
        };
    }
    if (action.type === "ADD_MANUAL_TIME_TO_BUFFER") {
        return {
            ...state,
            ...action.time,
        };
    }
    if (action.type === "CLEAR_MANUAL_INPUT") {
        return {
            ...state,
            ...initialState.manualInputBuffer,
        };
    }
    return state;
};

const manualInputFormReducer = (state = initialState.manualInputForm, action) => {
    if (action.type === "SET_MANUAL_INPUT_VALUE") {
        return {
            ...state,
            inputValue: action.inputValue,
        };
    }
    if (action.type === "SET_MANUAL_INPUT_DATE") {
        return {
            ...state,
            inputDate: action.inputDate,
        };
    }
    if (action.type === "SET_MANUAL_INPUT_DURATION") {
        return {
            ...state,
            inputDuration: action.inputDuration,
        };
    }
    if (action.type === "CLEAR_MANUAL_INPUT") {
        return {
            ...state,
            ...initialState.manualInputForm,
        };
    }
    return state;
};

const databaseStagingReducer = (state = initialState.databaseStaging, action) => {
    if (action.type === "ADD_BUFFER_TO_STAGING") {
        return {
            ...state,
            incidents: [...state.incidents, ...[action.buffer]],
        };
    }
    if (action.type === "CLEAR_STAGING") {
        return {
            ...state,
            ...initialState.databaseStaging,
        };
    }
    if (action.type === "IMPORT_TAKEOUT_TO_STAGING") {
        return {
            ...state,
            incidents: [...state.incidents, ...action.incidents],
        };
    }
    if (action.type === "DELETE_FROM_STAGING") {
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
    if (action.type === "SET_ZOOM") {
        return {
            ...state,
            zoom: action.zoom,
        };
    }
    return state;
};

const topBarReducer = (state = initialState.topBar, action) => {
    if (action.type === "SET_DRAWER") {
        return {
            ...state,
            drawer: action.drawer,
        };
    }
    return state;
};

const filterReducer = (state = initialState.filter, action) => {
    if (action.type === "SET_VERIFIED_FILTER") {
        return {
            ...state,
            verified: action.verified,
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
});
