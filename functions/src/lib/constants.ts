export const RAW_ISREAL_DATA = "rawIsrealData-schemaV1.0";
export const RAW_KOREA_DATA = "rawKoreaData-schemaV1.0";
export const INCIDENTS = "incidents-schemaV1.0";
export const RETIRED_INCIDENTS = "retired-incidents-schemaV1.0";
export const GOOGLEPLACES_SLEEP_INTERVAL = 125;
export const GOOGLEPLACES_ENDPOINT = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`;
export const ARCGIS_ENDPOINT =
    "https://services5.arcgis.com/dlrDjz89gx9qyfev/arcgis/rest/services/Corona_Exposure_View/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&maxRecordCountFactor=4&outSR=4326&resultOffset=0&resultRecordCount=8000&cacheHint=true";
export const NAVER_ENDPOINT = "https://coronamap.site/javascripts/ndata.js";
export const KOREA_DEFAULT_DURATION_MS = 60 * 60 * 1000;
export const RETIRE_INCIDENTS_TIME_MS = 14 * 24 * 60 * 60 * 1000;
export const DISPLAY_MAP_INIT_ZOOM = 12;
export const QUERY_INIT_RADIUS = 100;

export const GANGNAM_GPS_POSITION = {
    lat: 37.5172,
    lng: 127.0473,
};
export const TELAVIV_GPS_POSITION = {
    lat: 32.0853,
    lng: 34.7818,
};

export const MIT_GPS_POSITION = {
    lat: 42.3601,
    lng: -71.0942,
};

export const SUBMIT_MAP_INIT_POS = MIT_GPS_POSITION;
