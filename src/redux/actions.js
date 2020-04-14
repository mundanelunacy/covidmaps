import { getRadiusFromBounds } from "../utilities/geo";
import { insertNoDupes } from "../utilities/firebaseHelpers";
import { INCIDENTS } from "../config/constants";
import * as actions from "./types";
const geofirex = require("geofirex");
const get = geofirex.get;

export const importTakeoutToStaging = (placeVisits, firebase) => (dispatch) => {
    const geo = geofirex.init(firebase);
    const incidents = placeVisits.map(({ placeVisit }, idx) => {
        const position = geo.point(
            placeVisit.location.latitudeE7 / 10000000,
            placeVisit.location.longitudeE7 / 10000000
        );
        return {
            name: placeVisit.location.name,
            placeId: placeVisit.location.placeId,
            address: placeVisit.location.address,
            startTimestampMs: parseInt(placeVisit.duration.startTimestampMs),
            endTimestampMs: parseInt(placeVisit.duration.endTimestampMs),
            validated: false,
            position,
        };
    });

    dispatch({ type: actions.IMPORT_TAKEOUT_TO_STAGING, incidents });
};

const displayFilter = (incidents, filter) => {
    if (filter.verified) {
        return incidents.filter((el) => el.validated);
    }

    return incidents;
};

const query = async (lat, lng, radius, firebase, filter) => {
    const geo = geofirex.init(firebase);
    const query = geo
        .query(firebase.firestore().collection(INCIDENTS))
        .within(geo.point(lat, lng), radius, "position");

    let incidents = await get(query);
    incidents = displayFilter(incidents, filter);

    return incidents;
};

export const queryIncidents = (lat, lng, radius, firebase) => async (dispatch, getState) => {
    const incidents = await query(lat, lng, radius, firebase, getState().filter);

    dispatch({
        type: actions.QUERY_INCIDENTS,
        query: {
            center: { lat, lng },
            radius,
            incidents,
        },
    });
};

export const centerMoved = (mapProps, map, firebase) => async (dispatch, getState) => {
    const lat = map.center.lat();
    const lng = map.center.lng();
    const radius = getRadiusFromBounds(map);
    const incidents = await query(lat, lng, radius, firebase, getState().filter);

    dispatch({
        type: actions.CENTER_MOVED,
        query: {
            center: { lat, lng },
            radius,
            incidents,
        },
    });
};

export const changeTimeZone = (tzString) => (dispatch, getState) => {
    dispatch({
        type: actions.CHANGE_TIMEZONE,
        tzString,
    });
};

export const loadParsedVisits = (placeVisits) => (dispatch) => {
    dispatch({
        type: actions.LOAD_VISITS,
        placeVisits,
    });
};

export const addManualInputPlaceToBuffer = (value, results, firebase) => (dispatch) => {
    const geo = geofirex.init(firebase);

    const place = {
        name: value.description,
        address: results[0].formatted_address,
        placeId: value.place_id,
        position: geo.point(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
    };

    dispatch({
        type: actions.ADD_MANUAL_PLACE_TO_BUFFER,
        place,
    });
};

export const addManualInputTimeToBuffer = (startDate, durationMin) => (dispatch) => {
    dispatch({
        type: actions.ADD_MANUAL_TIME_TO_BUFFER,
        time: {
            startTimestampMs: startDate.getTime(),
            endTimestampMs: startDate.getTime() + 1000 * 60 * durationMin,
        },
    });
};

export const setManualInputValue = (inputValue) => (dispatch) => {
    dispatch({
        type: actions.SET_MANUAL_INPUT_VALUE,
        inputValue,
    });
};

export const setManualInputDate = (inputDate) => (dispatch) => {
    dispatch({
        type: actions.SET_MANUAL_INPUT_DATE,
        inputDate,
    });
};

export const setManualInputDuration = (inputDuration) => (dispatch) => {
    dispatch({
        type: actions.SET_MANUAL_INPUT_DURATION,
        inputDuration,
    });
};

export const clearManualInput = () => (dispatch) => {
    dispatch({
        type: actions.CLEAR_MANUAL_INPUT,
    });
};

export const addBufferToStaging = (buffer) => (dispatch) => {
    dispatch({
        type: actions.ADD_BUFFER_TO_STAGING,
        buffer,
    });
};

export const uploadStagingToDb = (stagingIncidents, firebase) => async (dispatch) => {
    const insertedIds = await Promise.all(
        stagingIncidents.map(async (incident, idx) => {
            return await insertNoDupes(incident, INCIDENTS, firebase);
        })
    );

    return insertedIds.filter((value) => value);
};

export const clearStaging = () => (dispatch) => {
    dispatch({
        type: actions.CLEAR_STAGING,
    });
};

export const deleteFromStaging = (index) => (dispatch) => {
    dispatch({
        type: actions.DELETE_FROM_STAGING,
        index,
    });
};

export const setZoom = (zoom) => (dispatch) => {
    dispatch({
        type: actions.SET_ZOOM,
        zoom,
    });
};

export const setDrawerOpen = (drawer) => (dispatch) => {
    dispatch({
        type: actions.SET_DRAWER,
        drawer,
    });
};

export const setVerifiedFilter = (verified) => (dispatch, getState) => {
    dispatch({
        type: actions.SET_VERIFIED_FILTER,
        verified,
    });
};

export const setSubmittedPlaces = (submittedPlaces) => (dispatch) => {
    dispatch({
        type: actions.DISPLAY_UPLOAD_CONFIRMATION,
        submittedPlaces,
    });
};
