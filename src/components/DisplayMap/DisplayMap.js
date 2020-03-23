import React from "react";
import { Box } from "@material-ui/core";
import { Map, InfoWindow, Marker } from "google-maps-react";
import { getDistance } from "../../utilities/geo";

export class DisplayMap extends React.Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    onCenterMoved = (mapProps, map) => {
        console.log(`center:  (${map.center.lat()}, ${map.center.lng()})\nradius:  ${getDistance(map.getBounds().getNorthEast(), map.getBounds().getSouthWest()) / 2}`);
    };

    render = () => {
        const { center, incidents, initialCenter } = this.props;

        console.log(incidents);
        return (
            <>
                <Box p={1} component="span">
                    DisplayMap
                </Box>

                <Box>
                    <Map google={this.props.google} zoom={14} center={center} onClick={this.onMapClicked} initialCenter={initialCenter} onDragend={this.onCenterMoved} style={{ width: "500px", height: "500px" }}>
                        {incidents.map(incident => (
                            <Marker key={incident.id} title={incident.name} name={incident.name} position={{ lat: incident.position.geopoint.F, lng: incident.position.geopoint.F }} onClick={this.onMarkerClick} />
                        ))}
                        <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                            <div>
                                <h1>{this.state.selectedPlace.name}</h1>
                            </div>
                        </InfoWindow>
                    </Map>
                </Box>
            </>
        );
    };
}
