import React from "react";
import { Box, Select, MenuItem } from "@material-ui/core";
import { useStyles } from "./AddDurationCss";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const AddDuration = ({
    addManualInputTimeToBuffer,
    setManualInputDate,
    setManualInputDuration,
    manualInputDate,
    manualInputDuration
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
        </Box>
    );
};
