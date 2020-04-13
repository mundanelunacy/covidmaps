import React from "react";
import { Map } from "google-maps-react";
import { CustomMarker } from "../CustomMarker";

export const DisplayMap = ({
    initialCenter,
    centerMoved,
    firebase,
    query,
    tzString,
    queryIncidents,
    setZoom,
    zoom,
}) => {
    const google = window.google;
    const infoWindow = new google.maps.InfoWindow({ content: "" });

    const onCenterMoved = (mapProps, map) => {
        centerMoved(mapProps, map, firebase);
    };

    const onMapInitialized = (mapProps, map) => {
        map.setOptions({
            minZoom: 5,
            zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
        });

        map.addListener("zoom_changed", () => {
            const newZoom = map.getZoom();
            if (newZoom < zoom) {
                onCenterMoved(mapProps, map);
            }
            setZoom(newZoom);
        });

        if (initialCenter) {
            queryIncidents(initialCenter.lat, initialCenter.lng, query.radius, firebase);
            return;
        }

        if (query) {
            queryIncidents(query.center.lat, query.center.lng, query.radius, firebase);
            return;
        }
    };
    return (
        <>
            <Map
                google={google}
                zoom={zoom}
                center={query.center}
                initialCenter={initialCenter}
                onDragend={onCenterMoved}
                streetViewControl={false}
                mapTypeControl={false}
                onClick={() => infoWindow.close()}
                fullscreenControl={false}
                onReady={onMapInitialized}
                style={{ width: "100%", height: "100%" }}
                containerStyle={{ position: "static", width: "100%", height: "100%" }}
            >
                <CustomMarker incidents={query.incidents} infoWindow={infoWindow} />
            </Map>
        </>
    );
};
