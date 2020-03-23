import React, { useState } from "react";
import { Box, TextField, Typography, Button, List, ListItem } from "@material-ui/core";
import { useStyles } from "./GeoPointQueryCss";
import { DisplayMap } from "../DisplayMap";

const geofirex = require("geofirex");

export const GeoPointQuery = ({ firebase }) => {
    const firestore = firebase.firestore();
    const geo = geofirex.init(firebase);
    const get = geofirex.get;
    const classes = useStyles();
    const initialCenter = { lat: 45, lng: 45 };

    const [incidents, setIncidents] = useState([]);
    const [inputLat, setInputLat] = useState("");
    const [inputLong, setInputLong] = useState("");
    const [queryLat, setQueryLat] = useState(initialCenter.lat);
    const [queryLong, setQueryLong] = useState(initialCenter.lng);
    const [queryRadius, setQueryRadius] = useState(20000);

    const queryPosition = async () => {
        if (queryLat && queryLong && queryRadius) {
            const query = geo.query("incidents").within(geo.point(parseFloat(queryLat), parseFloat(queryLong)), queryRadius, "position");
            const hits = await get(query);
            setIncidents(hits);
        }
    };

    const submitCoord = () => {
        const incidents = firestore.collection("incidents");
        const position = geo.point(parseFloat(inputLat), parseFloat(inputLong));
        incidents.add({ name: "Phoenix", position });
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
                <Button type="submit" onClick={queryPosition}>
                    Query coordinate
                </Button>
            </Box>
            <Box p={1} component="span" className={classes.root}>
                <Typography>Add Coordinates</Typography>
                <TextField label="Latitude" onChange={e => setInputLat(e.target.value)} value={inputLat} />
                <TextField label="Longitude" onChange={e => setInputLong(e.target.value)} value={inputLong} />
                <Button type="submit" onClick={submitCoord}>
                    Add coordinate
                </Button>
            </Box>
            <Box p={1} component="span" className={classes.root}>
                <List>
                    {incidents.map((item, idx) => (
                        <ListItem key={idx}>
                            ID: {item.id} Lat: {item.position.geopoint.F} Long: {item.position.geopoint.V} Geohash: {item.position.geohash}
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <DisplayMap center={{ lat: queryLat, lng: queryLong }} incidents={incidents} initialCenter={initialCenter} />
            </Box>
        </>
    );
};
