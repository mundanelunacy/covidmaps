import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./GeoPointQueryCss";
import { GeoFirestore } from "geofirestore";
// import {GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot} from "geofirestore"

export const GeoPointQuery = ({ firestore }) => {
    const classes = useStyles();

    const geofirestore = new GeoFirestore(firestore);
    const geocollection = geofirestore.collection("cases");

    // Add a GeoDocument to a GeoCollection
    geocollection.add({
        name: "Geofirestore",
        score: 100,
        // The coordinates field must be a GeoPoint!
        coordinates: new firestore.GeoPoint(40.7589, -73.9851)
    });

    const query = geocollection.near({ center: new firestore.GeoPoint(40.7589, -73.9851), radius: 0 });

    query.get().then(value => {
        console.log(value);
        console.log(value.docs[0].data());
    });

    return (
        <Box p={1} component="span" className={classes.root}>
            GeoPointQuery
        </Box>
    );
};
