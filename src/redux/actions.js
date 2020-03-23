import { getDistance } from "../utilities/geo";

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

export const onCenterMoved = (mapProps, map) => dispatch => {
    dispatch({
        type: "CENTER_MOVED",
        query: {
            center: {
                lat: map.center.lat(),
                lng: map.center.lng()
            },
            radius: getDistance(map.getBounds().getNorthEast(), map.getBounds().getSouthWest()) / 2
        }
    });
};

// console.log(`center:  (${map.center.lat()}, ${map.center.lng()})\nradius:  ${getDistance(map.getBounds().getNorthEast(), map.getBounds().getSouthWest()) / 2}`);
