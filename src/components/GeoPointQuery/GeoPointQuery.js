import React, { useState, useEffect, useCallback } from "react";
// import { Box, TextField, Typography, Button, List, ListItem } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useStyles } from "./GeoPointQueryCss";
import { DisplayMap } from "../DisplayMap";

export const GeoPointQuery = ({ firebase, submitIncident, query, queryIncidents }) => {
    const classes = useStyles();
    const initialCenter = query ? { lat: query.center.lat, lng: query.center.lng } : { lat: 0, lng: 0 };

    const [inputLat, setInputLat] = useState("");
    const [inputLong, setInputLong] = useState("");
    const [queryLat, setQueryLat] = useState(initialCenter.lat);
    const [queryLong, setQueryLong] = useState(initialCenter.lng);
    const [queryRadius, setQueryRadius] = useState(query ? query.radius : 1);

    const onQueryPosition = useCallback(() => {
        if (queryLat && queryLong && queryRadius) {
            queryIncidents(parseFloat(queryLat), parseFloat(queryLong), parseFloat(queryRadius), firebase);
        }
    }, [queryLat, queryLong, queryRadius, firebase, queryIncidents]);

    // const onSubmitIncident = () => {
    //     submitIncident(parseFloat(inputLat), parseFloat(inputLong), firebase);
    //     setInputLat("");
    //     setInputLong("");
    // };

    useEffect(() => onQueryPosition(), [onQueryPosition]);

    return (
        <>
            {/* <Box p={1} component="span" className={classes.root}>
                <Typography>Query Coordinates</Typography>
                <TextField label="Latitude" onChange={e => setQueryLat(e.target.value)} />
                <TextField label="Longitude" onChange={e => setQueryLong(e.target.value)} />
                <TextField label="Radius (km)" onChange={e => setQueryRadius(e.target.value)} />
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
            </Box> */}
            {/* <Box p={1} component="span" className={classes.root}>
                <List>
                    {query.incidents.map((item, idx) => (
                        <ListItem key={idx}>
                            ID: {item.id} Lat: {item.position.geopoint.F} Long: {item.position.geopoint.V} Geohash: {item.position.geohash}
                        </ListItem>
                    ))}
                </List>
            </Box> */}
            <Box p={1} component="span" className={classes.root}>
                <DisplayMap initialCenter={initialCenter} />
            </Box>
        </>
    );
};
