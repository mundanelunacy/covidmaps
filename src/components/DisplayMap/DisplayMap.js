import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Map, InfoWindow, Marker } from "google-maps-react";
import moment from "moment-timezone";

export const DisplayMap = ({ initialCenter, onMarkerClick, onMapClicked, centerMoved, displayMap, firebase, query, google, tzString, queryIncidents }) => {
    const onCenterMoved = (mapProps, map) => {
        centerMoved(mapProps, map, firebase);
    };

    const onMapInitialized = (mapProps, map) => {
        map.setOptions({ minZoom: 15 });

        if (initialCenter) {
            queryIncidents(initialCenter.lat, initialCenter.lng, 2, firebase);
            return;
        }

        if (query) {
            queryIncidents(query.center.lat, query.center.lng, 2, firebase);
            return;
        }
    };

    const icon = {
        url: "/covid_icon.png",
        anchor: new google.maps.Point(12, 12),
        scaledSize: new google.maps.Size(24, 24)
    };

    return (
        <>
            <Map google={google} zoom={16} center={query.center} onClick={onMapClicked} initialCenter={initialCenter} onDragend={onCenterMoved} streetViewControl={false} mapTypeControl={false} fullscreenControl={false} onReady={onMapInitialized}>
                {query.incidents.map(incident => (
                    <Marker key={incident.id} title={incident.name} name={incident.name} start={incident.startTimestampMs} end={incident.endTimestampMs} position={{ lat: incident.position.geopoint.latitude, lng: incident.position.geopoint.longitude }} onClick={onMarkerClick} icon={icon} />
                ))}
                <InfoWindow marker={displayMap.activeMarker} visible={displayMap.showingInfoWindow}>
                    <>
                        <Box>
                            <Typography>{displayMap.selectedPlace.name}</Typography>
                        </Box>
                        <Box>
                            <Typography>
                                {moment.tz(displayMap.selectedPlace.start, tzString).format("HH:mm Do-MMM-YYYY")} ({parseInt((displayMap.selectedPlace.end - displayMap.selectedPlace.start) / 1000 / 60)} min)
                            </Typography>
                        </Box>
                    </>
                </InfoWindow>
            </Map>
        </>
    );
};
