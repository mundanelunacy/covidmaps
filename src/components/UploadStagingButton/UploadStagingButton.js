import React from "react";
import { Box, Button } from "@material-ui/core";
import { useStyles } from "./UploadStagingButtonCss";

export const UploadStagingButton = ({
    firebase,
    uploadStagingValid,
    stagingIncidents,
    uploadStagingToDb,
    clearStaging
}) => {
    const classes = useStyles();

    return (
        <Box p={1} component="span" className={classes.root}>
            <Button variant="contained" onClick={clearStaging} disabled={!uploadStagingValid}>
                Clear List
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    uploadStagingToDb(stagingIncidents, firebase);
                    clearStaging();
                }}
                disabled={!uploadStagingValid}
            >
                Upload List to Covidmaps.org
            </Button>
        </Box>
    );
};
