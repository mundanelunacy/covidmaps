import React from "react";
import { Box } from "@material-ui/core";
import { Map, InfoWindow, Marker } from "google-maps-react";

export class DisplayMap extends React.Component {
    render = () => {
        const { center, incidents, initialCenter, onMarkerClick, onMapClicked, onCenterMoved, displayMap } = this.props;

        console.log(displayMap);
        return (
            <>
                <Box p={1} component="span">
                    DisplayMap
                </Box>

                <Box>
                    <Map google={this.props.google} zoom={14} center={center} onClick={onMapClicked} initialCenter={initialCenter} onDragend={onCenterMoved} style={{ width: "500px", height: "500px" }}>
                        {incidents.map(incident => (
                            <Marker key={incident.id} title={incident.name} name={incident.name} position={{ lat: incident.position.geopoint.F, lng: incident.position.geopoint.F }} onClick={onMarkerClick} />
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
}
