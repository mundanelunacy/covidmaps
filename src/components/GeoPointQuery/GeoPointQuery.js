import React, { useState } from "react";
import { Box, TextField, Typography, Button, List, ListItem } from "@material-ui/core";
import { useStyles } from "./GeoPointQueryCss";
import { DisplayMap } from "../DisplayMap";

// const geofirex = require("geofirex");

export const GeoPointQuery = ({ firebase, submitIncident, query, queryIncidents }) => {
    const classes = useStyles();
    const initialCenter = query ? { lat: query.center.lat, lng: query.center.lng } : { lat: 0, lng: 0 };

    const [inputLat, setInputLat] = useState("");
    const [inputLong, setInputLong] = useState("");
    const [queryLat, setQueryLat] = useState(initialCenter.lat);
    const [queryLong, setQueryLong] = useState(initialCenter.lng);
    const [queryRadius, setQueryRadius] = useState(20000);

    const onQueryPosition = async () => {
        if (queryLat && queryLong && queryRadius) {
            queryIncidents(queryLat, queryLong, queryRadius, firebase);
        }
    };

    const onSubmitIncident = () => {
        submitIncident(inputLat, inputLong, firebase);
        setInputLat("");
        setInputLong("");
    };

    // useEffect(() => queryPosition, [firstRun]);
    return (
        <>
            <Box p={1} component="span" className={classes.root}>
                <Typography>Query Coordinates</Typography>
                <TextField label="Latitude" onChange={e => setQueryLat(e.target.value)} />
                <TextField label="Longitude" onChange={e => setQueryLong(e.target.value)} />
                <TextField label="Radius" onChange={e => setQueryRadius(e.target.value)} />
                <Button type="submit" onClick={onQueryPosition}>
                    Query coordinate
                </Button>
            </Box>
            <Box p={1} component="span" className={classes.root}>
                <Typography>Add Coordinates</Typography>
                <TextField label="Latitude" onChange={e => setInputLat(e.target.value)} value={inputLat} />
                <TextField label="Longitude" onChange={e => setInputLong(e.target.value)} value={inputLong} />
                <Button type="submit" onClick={onSubmitIncident}>
                    Add coordinate
                </Button>
            </Box>
            <Box p={1} component="span" className={classes.root}>
                <List>
                    {query.incidents.map((item, idx) => (
                        <ListItem key={idx}>
                            ID: {item.id} Lat: {item.position.geopoint.F} Long: {item.position.geopoint.V} Geohash: {item.position.geohash}
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <DisplayMap initialCenter={initialCenter} />
            </Box>
        </>
    );
};
