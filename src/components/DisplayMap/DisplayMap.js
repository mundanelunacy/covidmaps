import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Map, InfoWindow, Marker } from "google-maps-react";
import moment from "moment-timezone";
const incubationPeriodDays = 14;

export const DisplayMap = ({
    initialCenter,
    onMarkerClick,
    onMapClicked,
    centerMoved,
    displayMap,
    firebase,
    query,
    tzString,
    queryIncidents
}) => {
    const google = window.google;
    const onCenterMoved = (mapProps, map) => {
        centerMoved(mapProps, map, firebase);
    };

    const onMapInitialized = (mapProps, map) => {
        map.setOptions({
            minZoom: 15,
            zoomControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM }
        });

        if (initialCenter) {
            queryIncidents(initialCenter.lat, initialCenter.lng, 2, firebase);
            return;
        }

        if (query) {
            queryIncidents(query.center.lat, query.center.lng, 2, firebase);
            return;
        }
    };

    // check for time difference and change marker color
    const filterMarkers = (google, incident, onMarkerClick) => {
        const differenceSeconds = (new Date().getTime() - incident.startTimestampMs) / 1000;
        const DAY = 24 * 60 * 60;
        const icon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#F00",
            fillOpacity: 1,
            strokeWeight: 0.4
        };

        // change icon color based on time difference from now till incubation period
        switch (true) {
            case differenceSeconds > 4 * DAY && differenceSeconds <= incubationPeriodDays * DAY:
                icon.fillColor = "#00F"; //blue
                break;
            case differenceSeconds > DAY && differenceSeconds <= 4 * DAY:
                icon.fillColor = "#FF0"; //yellow
                break;
            case differenceSeconds > 0 && differenceSeconds <= DAY:
                icon.fillColor = "#F00"; //red
                break;
            default:
                return;
        }

        // return marker
        return (
            <Marker
                key={incident.id}
                title={incident.name}
                name={incident.name}
                start={incident.startTimestampMs}
                end={incident.endTimestampMs}
                color
                position={{
                    lat: incident.position.geopoint.latitude,
                    lng: incident.position.geopoint.longitude
                }}
                onClick={onMarkerClick}
                icon={icon}
            />
        );
    };

    return (
        <>
            <Map
                google={google}
                zoom={16}
                center={query.center}
                onClick={onMapClicked}
                initialCenter={initialCenter}
                onDragend={onCenterMoved}
                streetViewControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                onReady={onMapInitialized}
                style={{ width: "100%", height: "100%" }}
                containerStyle={{ position: "static", width: "100%", height: "100%" }}
            >
                {query.incidents.map(incident => filterMarkers(google, incident, onMarkerClick))}
                <InfoWindow marker={displayMap.activeMarker} visible={displayMap.showingInfoWindow}>
                    <>
                        <Box>
                            <Typography>{displayMap.selectedPlace.name}</Typography>
                        </Box>
                        <Box>
                            <Typography>
                                {moment
                                    .tz(displayMap.selectedPlace.start, tzString)
                                    .format("HH:mm Do-MMM-YYYY")}{" "}
                                (
                                {parseInt(
                                    (displayMap.selectedPlace.end - displayMap.selectedPlace.start) /
                                        1000 /
                                        60
                                )}{" "}
                                min)
                            </Typography>
                        </Box>
                    </>
                </InfoWindow>
            </Map>
        </>
    );
};
