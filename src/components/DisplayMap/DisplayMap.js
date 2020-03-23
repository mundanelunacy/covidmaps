import React from "react";
import { Box, Typography } from "@material-ui/core";
import { Map, InfoWindow, Marker } from "google-maps-react";

export const DisplayMap = ({ initialCenter, onMarkerClick, onMapClicked, centerMoved, displayMap, firebase, query, google }) => {
    const onCenterMoved = (mapProps, map) => {
        centerMoved(mapProps, map, firebase);
    };

    const icon = {
        url: "/covid_icon.png",
        anchor: new google.maps.Point(32, 32),
        scaledSize: new google.maps.Size(64, 64)
    };

    return (
        <>
            <Box p={1} component="span">
                <Typography>DisplayMap</Typography>
            </Box>

            <Box>
                <Map google={google} zoom={14} center={query.center} onClick={onMapClicked} initialCenter={initialCenter} onDragend={onCenterMoved} style={{ width: "500px", height: "500px" }}>
                    {query.incidents.map(incident => (
                        <Marker key={incident.id} title={incident.name} name={incident.name} position={{ lat: incident.position.geopoint.latitude, lng: incident.position.geopoint.longitude }} icon={icon} onClick={onMarkerClick} />
                    ))}
                    <InfoWindow marker={displayMap.activeMarker} visible={displayMap.showingInfoWindow}>
                        <div>
                            <h1>{displayMap.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </Box>
        </>
    );
};
