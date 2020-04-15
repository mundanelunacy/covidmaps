import React from "react";
import { Map } from "google-maps-react";
import { CustomMarker } from "../CustomMarker";
import { getBounds } from "../../utilities/geo";
import { MIT_GPS_POSITION } from "../../config/constants";

export const SubmitMap = ({ stagingIncidents }) => {
    const google = window.google;
    const infoWindow = new google.maps.InfoWindow({ content: "" });

    const onMapInitialized = (mapProps, map) => {
        map.setOptions({
            minZoom: 0,
            zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },
            maxZoom: 15,
        });
    };

    return (
        <>
            <Map
                google={google}
                streetViewControl={false}
                mapTypeControl={false}
                onClick={() => infoWindow.close()}
                fullscreenControl={false}
                onReady={onMapInitialized}
                initialCenter={MIT_GPS_POSITION}
                style={{ position: "static", width: "100%", height: "100%" }}
                containerStyle={{ position: "static", width: "100%", height: window.innerHeight - 200 }}
                bounds={getBounds(
                    stagingIncidents.map((incident) => ({
                        lat: incident.position.geopoint.latitude,
                        lng: incident.position.geopoint.longitude,
                    }))
                )}
            >
                <CustomMarker incidents={stagingIncidents} infoWindow={infoWindow} />
            </Map>
        </>
    );
};
