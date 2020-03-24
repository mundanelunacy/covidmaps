import React, { useMemo } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { tzlist } from "../../data/timeConstants";

export const TimeZonePicker = props => {
    const tzChange = event => {
        props.changeTimeZone(event.target.value);
    };

    const tzMenuItems = () => {
        return tzlist.map(tz => (
            <MenuItem value={tz} key={tz}>
                {tz}
            </MenuItem>
        ));
    };

    const { classes, tzString } = props;

    const tzMenuEls = useMemo(() => tzMenuItems(), []);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="timeZone">Timezone</InputLabel>
            <Select value={tzString} onChange={tzChange} inputProps={{ name: "timeZone" }}>
                {tzMenuEls}
            </Select>
        </FormControl>
    );
};
