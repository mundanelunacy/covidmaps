import { getDistance } from "../utilities/geo";
const geofirex = require("geofirex");
const get = geofirex.get;

export const onMarkerClick = (props, marker, e) => dispatch => {
    dispatch({
        type: "MARKER_SELECT",
        payload: { props, marker }
    });
};

export const onMapClicked = props => (dispatch, getState) => {
    if (getState().displayMap.showingInfoWindow) {
        dispatch({
            type: "MARKER_CLEAR"
        });
    }
};

export const submitIncident = (inputLat, inputLong, firebase) => dispatch => {
    const geo = geofirex.init(firebase);
    const incidents = firebase.firestore().collection("incidents");
    const position = geo.point(inputLat, inputLong);
    incidents.add({ name: "Phoenix", position });
    dispatch({ type: "INPUT_COORD_CLEAR" });
};

export const submitIncidentBatch = (placeVisits, firebase) => dispatch => {
    const geo = geofirex.init(firebase);
    const incidents = firebase.firestore().collection("incidents");

    placeVisits.map(({ placeVisit }, idx) => {
        const position = geo.point(placeVisit.location.latitudeE7 / 10000000, placeVisit.location.longitudeE7 / 10000000);

        incidents.add({
            name: placeVisit.location.name,
            placeId: placeVisit.location.placeId,
            address: placeVisit.location.address,
            startTimestampMs: parseInt(placeVisit.duration.startTimestampMs),
            endTimestampMs: parseInt(placeVisit.duration.endTimestampMs),
            validated: Math.random() > 0.5,
            position
        });
        return {};
    });

    dispatch({ type: "PARSER_CLEAR" });
};

const query = async (lat, lng, radius, firebase) => {
    const geo = geofirex.init(firebase);
    // const query = geo.query("incidents").within(geo.point(lat, lng), radius, "position");

    const query = geo
        .query(
            firebase.firestore().collection("incidents")
            // .where("validated", "==", true)
        )
        .within(geo.point(lat, lng), radius, "position");

    return await get(query);
};

export const queryIncidents = (lat, lng, radius, firebase) => async dispatch => {
    const incidents = await query(lat, lng, radius, firebase);

    dispatch({
        type: "QUERY_INCIDENTS",
        query: {
            center: { lat, lng },
            radius,
            incidents
        }
    });
};

export const centerMoved = (mapProps, map, firebase) => async dispatch => {
    const lat = map.center.lat();
    const lng = map.center.lng();
    const radius = getDistance(map.getBounds().getNorthEast(), map.getBounds().getSouthWest()) / 2;
    const incidents = await query(lat, lng, radius, firebase);

    dispatch({
        type: "CENTER_MOVED",
        query: {
            center: { lat, lng },
            radius,
            incidents
        }
    });
};

export const changeTimeZone = tzString => (dispatch, getState) => {
    dispatch({
        type: "CHANGE_TIMEZONE",
        tzString
    });
};

export const loadParsedVisits = placeVisits => dispatch => {
    dispatch({
        type: "LOAD_VISITS",
        placeVisits
    });
};
