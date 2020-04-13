const incubationPeriodDays = 14;
const DAY = 24 * 60 * 60;

export const setMarkerIcon = (incident) => {
    // check for time difference and change marker color
    const differenceSeconds = (new Date().getTime() - incident.startTimestampMs) / 1000;

    const icon = {
        path: window.google.maps.SymbolPath.CIRCLE,
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

export const setMarker = (incident, icon) => {
    return new window.google.maps.Marker({
        position: {
            lat: incident.position.geopoint.latitude,
            lng: incident.position.geopoint.longitude,
        },
        title: incident.name,
        info: incident.placeId,
        icon,
    });
};
