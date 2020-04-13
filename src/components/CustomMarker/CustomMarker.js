import React, { useReducer, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import moment from "moment-timezone";
import MarkerClusterer from "@google/markerclustererplus";
import ReactDOM from "react-dom";

const incubationPeriodDays = 14;
const DAY = 24 * 60 * 60;

// import { useStyles } from "./CustomMarkerCss";

const InfoWindowContent = ({ incident, tzString }) => {
    const googleMapsPlaceLinkRoot = "https://www.google.com/maps/place/?q=place_id:";
    return (
        <>
            <Box>
                {incident.placeId ? (
                    <Typography>
                        <a
                            href={`${googleMapsPlaceLinkRoot}${incident.placeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {incident.name}
                        </a>
                    </Typography>
                ) : (
                    <Typography>{incident.name}</Typography>
                )}
            </Box>
            <Box>
                <Typography>
                    {moment.tz(incident.startTimestampMs, tzString).format("HH:mm Do-MMM-YYYY")} (
                    {parseInt((incident.endTimestampMs - incident.startTimestampMs) / 1000 / 60)} min)
                </Typography>
            </Box>{" "}
        </>
    );
};

export const CustomMarker = ({ google, map, mapCenter, incidents, tzString, infoWindow }) => {
    // check for time difference and change marker color

    const setMarkerIcon = (incident) => {
        const differenceSeconds = (new Date().getTime() - incident.startTimestampMs) / 1000;

        const icon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#F00",
            fillOpacity: 1,
            strokeWeight: 0.4,
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
                return null;
        }

        return icon;
    };

    const setMarker = (incident, icon) => {
        return new google.maps.Marker({
            position: {
                lat: incident.position.geopoint.latitude,
                lng: incident.position.geopoint.longitude,
            },
            title: incident.name,
            info: incident.placeId,
            icon,
        });
    };

    const markerClusterReducer = (state, action) => {
        const markers = action.incidents.map((incident, index) => {
            const icon = setMarkerIcon(incident);

            if (!icon) {
                return null;
            }

            const marker = setMarker(incident, icon);

            marker.addListener("click", () => {
                const infoWindowContent = <InfoWindowContent incident={incident} tzString={tzString} />;
                const div = document.createElement("div");
                ReactDOM.render(infoWindowContent, div);
                infoWindow.setContent(div);
                infoWindow.open(map, marker);
            });

            return marker;
        });

        return new MarkerClusterer(
            map,
            markers.filter((value) => value),
            {
                imagePath: "/clusters/m",
                maxZoom: 15,
            }
        );
    };

    // const [markerCluster, setMarkerCluster] = useReducer(markerClusterReducer, null);
    const [, setMarkerCluster] = useReducer(markerClusterReducer, null);
    useEffect(() => {
        setMarkerCluster({ incidents });
    }, [incidents]);

    return null;
};
