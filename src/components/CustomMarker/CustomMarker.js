import React, { useReducer, useEffect } from "react";
import MarkerClusterer from "@google/markerclustererplus";
import ReactDOM from "react-dom";
import { InfoWindowContent } from "./InfoWindowContent";
import { setMarker, setMarkerIcon } from "./markerCreation";

// import { useStyles } from "./CustomMarkerCss";

export const CustomMarker = ({ google, map, mapCenter, incidents, tzString, infoWindow }) => {
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

        if (!state.getMap()) {
            return new MarkerClusterer(
                map,
                markers.filter((value) => value),
                { imagePath: "/clusters/m", maxZoom: 15 }
            );
        }

        state.clearMarkers();
        state.addMarkers(markers.filter((value) => value));
        return state;
    };
    const [, setMarkerCluster] = useReducer(
        // const [markerCluster, setMarkerCluster] = useReducer(
        markerClusterReducer,
        new MarkerClusterer(map, [], { imagePath: "/clusters/m", maxZoom: 15 })
    );

    useEffect(() => {
        setMarkerCluster({ incidents });
    }, [incidents, map]);

    // console.log(markerCluster);
    return null;
};
