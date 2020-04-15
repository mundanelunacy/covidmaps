import React from "react";
import { Box, Button } from "@material-ui/core";
import { useStyles } from "./UploadStagingButtonCss";
import { getIncident } from "../../utilities/firebaseHelpers";

export const UploadStagingButton = ({
    firebase,
    uploadStagingValid,
    stagingIncidents,
    uploadStagingToDb,
    clearStaging,
    setSubmittedPlaces,
    queryIncidents,
    query,
}) => {
    const classes = useStyles();

    const handleUpload = async () => {
        const docIds = await uploadStagingToDb(stagingIncidents, firebase);
        if (docIds.length > 0) {
            setSubmittedPlaces(docIds.length);
            const firstDoc = await getIncident(docIds[0], firebase);
            queryIncidents(
                firstDoc.position.geopoint.latitude,
                firstDoc.position.geopoint.longitude,
                query.radius,
                firebase
            );
        }
        clearStaging();
    };

    return (
        <Box p={1} component="span" className={classes.root}>
            <Button variant="contained" onClick={clearStaging} disabled={!uploadStagingValid}>
                Clear List
            </Button>
            <Button variant="contained" onClick={handleUpload} disabled={!uploadStagingValid}>
                Upload List to Covidmaps.org
            </Button>
        </Box>
    );
};
