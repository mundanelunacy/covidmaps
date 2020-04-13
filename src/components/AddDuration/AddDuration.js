import React from "react";
import { Box, Select, MenuItem } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useStyles } from "./AddDurationCss";
import DateFnsUtils from "@date-io/date-fns";
const SUBMISSION_TIMEFRAME = 14 * 24 * 60 * 60 * 1000;

export const AddDuration = ({
    addManualInputTimeToBuffer,
    setManualInputDate,
    setManualInputDuration,
    manualInputDate,
    manualInputDuration,
    tzString,
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

    const handleManualInputDate = (date) => {
        setManualInputDate(date);
        addManualInputTimeToBuffer(date, manualInputDuration);
    };

    const handleManualInputDuration = (e) => {
        setManualInputDuration(e.target.value);
    };

    return (
        <Box className={classes.root} mt={2}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    placeholder="2020/01/01"
                    value={manualInputDate}
                    minDate={Date.now() - SUBMISSION_TIMEFRAME}
                    onChange={handleManualInputDate}
                    format="yyyy/MM/dd HH:mm"
                    showTodayButton
                />
            </MuiPickersUtilsProvider>
            <Select value={manualInputDuration} onChange={handleManualInputDuration} mt={2}>
                {durationItems()}
            </Select>
        </Box>
    );
};
