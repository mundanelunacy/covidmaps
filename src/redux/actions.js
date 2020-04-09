import { getDistance } from "../utilities/geo";
import { INCIDENTS } from "../config/firebaseCollections";
const geofirex = require("geofirex");
const get = geofirex.get;

export const submitIncident = (inputLat, inputLong, firebase) => (dispatch) => {
    const geo = geofirex.init(firebase);
    const incidents = firebase.firestore().collection(INCIDENTS);
    const position = geo.point(inputLat, inputLong);
    incidents.add({ name: "Phoenix", position });
    dispatch({ type: "INPUT_COORD_CLEAR" });
};

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
            validated: Math.random() > 0.5,
            position,
        };
    });

    dispatch({ type: "IMPORT_TAKEOUT_TO_STAGING", incidents });
};

const query = async (lat, lng, radius, firebase) => {
    const geo = geofirex.init(firebase);
    // const query = geo.query("incidents").within(geo.point(lat, lng), radius, "position");

    const query = geo
        .query(
            firebase.firestore().collection(INCIDENTS)
            // .where("validated", "==", true)
        )
        .within(geo.point(lat, lng), radius, "position");

    return await get(query);
};

export const queryIncidents = (lat, lng, radius, firebase) => async (dispatch) => {
    const incidents = await query(lat, lng, radius, firebase);

    dispatch({
        type: "QUERY_INCIDENTS",
        query: {
            center: { lat, lng },
            radius,
            incidents,
        },
    });
};

export const centerMoved = (mapProps, map, firebase) => async (dispatch) => {
    const lat = map.center.lat();
    const lng = map.center.lng();
    const radius = getDistance(map.getBounds().getNorthEast(), map.getBounds().getSouthWest()) / 2;
    const incidents = await query(lat, lng, radius, firebase);

    dispatch({
        type: "CENTER_MOVED",
        query: {
            center: { lat, lng },
            radius,
            incidents,
        },
    });
};

export const changeTimeZone = (tzString) => (dispatch, getState) => {
    dispatch({
        type: "CHANGE_TIMEZONE",
        tzString,
    });
};

export const loadParsedVisits = (placeVisits) => (dispatch) => {
    dispatch({
        type: "LOAD_VISITS",
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
        type: "ADD_MANUAL_PLACE_TO_BUFFER",
        place,
    });
};

export const addManualInputTimeToBuffer = (startDate, durationMin) => (dispatch) => {
    dispatch({
        type: "ADD_MANUAL_TIME_TO_BUFFER",
        time: {
            startTimestampMs: startDate.getTime(),
            endTimestampMs: startDate.getTime() + 1000 * 60 * durationMin,
        },
    });
};

export const setManualInputValue = (inputValue) => (dispatch) => {
    dispatch({
        type: "SET_MANUAL_INPUT_VALUE",
        inputValue,
    });
};

export const setManualInputDate = (inputDate) => (dispatch) => {
    dispatch({
        type: "SET_MANUAL_INPUT_DATE",
        inputDate,
    });
};

export const setManualInputDuration = (inputDuration) => (dispatch) => {
    dispatch({
        type: "SET_MANUAL_INPUT_DURATION",
        inputDuration,
    });
};

export const clearManualInput = () => (dispatch) => {
    dispatch({
        type: "CLEAR_MANUAL_INPUT",
    });
};

export const addBufferToStaging = (buffer) => (dispatch) => {
    dispatch({
        type: "ADD_BUFFER_TO_STAGING",
        buffer,
    });
};

export const uploadStagingToDb = (stagingIncidents, firebase) => (dispatch) => {
    // const geo = geofirex.init(firebase);
    const incidents = firebase.firestore().collection(INCIDENTS);

    stagingIncidents.map((incident, idx) => {
        incidents.add(incident);
        return {};
    });
};

export const clearStaging = () => (dispatch) => {
    dispatch({
        type: "CLEAR_STAGING",
    });
};

export const deleteFromStaging = (index) => (dispatch) => {
    dispatch({
        type: "DELETE_FROM_STAGING",
        index,
    });
};

export const setZoom = (zoom) => (dispatch) => {
    dispatch({
        type: "SET_ZOOM",
        zoom,
    });
};

export const setDrawerOpen = (drawer) => (dispatch) => {
    dispatch({
        type: "SET_DRAWER",
        drawer,
    });
};
