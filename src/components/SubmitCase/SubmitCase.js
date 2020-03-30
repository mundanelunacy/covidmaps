import React from "react";
// import { Box, Select, MenuItem, Button } from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import { useStyles } from "./SubmitCaseCss";
// import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

// import DateFnsUtils from "@date-io/date-fns";
import { AddPlace } from "../AddPlace";
import { AddDuration } from "../AddDuration";
import { StagingList } from "../StagingList";

export const SubmitCase = ({
    firebase,
    manualInputBuffer,
    manualInputValid,
    uploadStagingValid,
    stagingIncidents,
    clearManualInput,
    addBufferToStaging,
    uploadStagingToDb,
    clearStaging
}) => {
    const classes = useStyles();

    return (
        <Box p={1} component="span" className={classes.root}>
            <AddPlace />
            <AddDuration />
            <Button
                variant="contained"
                disabled={!manualInputValid}
                onClick={() => {
                    addBufferToStaging(manualInputBuffer);
                    clearManualInput();
                }}
            >
                Add to List
            </Button>
            <StagingList />

            <Button
                variant="contained"
                onClick={() => {
                    uploadStagingToDb(stagingIncidents, firebase);
                    clearStaging();
                }}
                disabled={!uploadStagingValid}
            >
                Upload List to Coronamaps.org
            </Button>
        </Box>
    );
};
