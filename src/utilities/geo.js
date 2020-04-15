// Distance Between two points using Haversine formula
// https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3

const rad = (x) => {
    return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2) => {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat());
    var dLong = rad(p2.lng() - p1.lng());
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d / 1000; // returns the distance in kilometer
};

export const getRadiusFromBounds = (map) => {
    const bounds = { p1: map.getBounds().getNorthEast(), p2: map.getBounds().getSouthWest() };
    return getDistance(bounds.p1, bounds.p2) / 2;
};

export const getBounds = (points) => {
    const bounds = new window.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
    }
    return bounds;
};
