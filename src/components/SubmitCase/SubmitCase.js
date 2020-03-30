import React from "react";
import { Box, Select, MenuItem, Button } from "@material-ui/core";
import { useStyles } from "./SubmitCaseCss";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { AddPlace } from "../AddPlace";
import { StagingList } from "../StagingList";

export const SubmitCase = ({
    firebase,
    addManualInputTimeToBuffer,
    manualInputValid,
    setManualInputDate,
    setManualInputDuration,
    manualInputDate,
    manualInputDuration,
    clearManualInput,
    addBufferToStaging,
    manualInputBuffer,
    uploadStagingToDb,
    uploadStagingValid,
    stagingIncidents,
    clearStaging
}) => {
    const classes = useStyles();

    const durationItems = () => {
        let hourTmp = 1;
        const items = [];

        items.push(
            <MenuItem key={0.5} value={30}>
                30 Minutes
            </MenuItem>
        );
        for (hourTmp = 1; hourTmp <= 24; hourTmp += 0.5) {
            items.push(
                <MenuItem key={hourTmp} value={60 * hourTmp}>
                    {hourTmp} {hourTmp === 1 ? "hour" : "hours"}
                </MenuItem>
            );
        }
        return items;
    };

    const handleManualInputDate = date => {
        setManualInputDate(date);
        addManualInputTimeToBuffer(date, manualInputDuration);
    };

    const handleManualInputDuration = e => {
        setManualInputDuration(e.target.value);
    };

    return (
        <Box p={1} component="span" className={classes.root}>
            <AddPlace />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    placeholder="2020/01/01"
                    value={manualInputDate}
                    onChange={handleManualInputDate}
                    format="yyyy/MM/dd HH:mm"
                />
            </MuiPickersUtilsProvider>
            <Select value={manualInputDuration} onChange={handleManualInputDuration}>
                {durationItems()}
            </Select>

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
