import React from "react";
import { Box, List, ListItem, Typography } from "@material-ui/core";
import { useStyles } from "./StagingListCss";
import moment from "moment-timezone";

export const StagingList = ({ incidents, tzString }) => {
    const classes = useStyles();
    return (
        <Box p={1} component="span" className={classes.root}>
            <List>
                {incidents.map(incident => {
                    const startTime = moment.tz(parseInt(incident.startTimestampMs), tzString);
                    const durationMin = parseInt(
                        (parseInt(incident.endTimestampMs) - parseInt(incident.startTimestampMs)) / 1000 / 60
                    );
                    return (
                        <ListItem>
                            <Typography>{incident.name}</Typography>
                            <Typography>{startTime.format("HH:mm Do-MMM-YYYY (ddd)")}</Typography>
                            <Typography>{durationMin} min</Typography>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};
