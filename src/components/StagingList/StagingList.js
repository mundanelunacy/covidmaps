import React from "react";
import {
    Button,
    Box,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@material-ui/core";
import { useStyles } from "./StagingListCss";
import moment from "moment-timezone";

export const StagingList = ({
    incidents,
    tzString,
    deleteFromStaging,
    deleteFromStagingFs,
    match,
    firebase,
}) => {
    const classes = useStyles();
    return (
        <Box p={1} component="span" className={classes.root}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incidents.map((incident, idx) => {
                            const startTime = moment.tz(parseInt(incident.startTimestampMs), tzString);
                            const durationMin = parseInt(
                                (parseInt(incident.endTimestampMs) - parseInt(incident.startTimestampMs)) /
                                    1000 /
                                    60
                            );
                            return (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <Typography>{incident.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{startTime.format("HH:mm Do-MMM-YYYY (ddd)")}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{durationMin} min</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            onClick={() => {
                                                if (match.params.token) {
                                                    deleteFromStagingFs(idx, match.params.token, firebase);
                                                } else {
                                                    deleteFromStaging(idx);
                                                }
                                            }}
                                        >
                                            Delete Row
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
