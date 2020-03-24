import React from "react";
import { Box, Link, Typography, List, ListItem, Button } from "@material-ui/core";
import { useStyles } from "./TakeoutParserCss";
import { TimeZonePicker } from "../TimeZonePicker";
import moment from "moment-timezone";

export const TakeoutParser = ({ loadParsedVisits, placeVisits, tzString, submitIncidentBatch, firebase }) => {
    const classes = useStyles();

    let fileReader;

    const handleFileRead = e => {
        const placeVisits = JSON.parse(fileReader.result).timelineObjects.filter(obj => obj.placeVisit && obj.placeVisit.location.locationConfidence > 50 && (parseInt(obj.placeVisit.duration.endTimestampMs) - parseInt(obj.placeVisit.duration.startTimestampMs)) / 1000 / 60 > 30);
        loadParsedVisits(placeVisits);
    };

    const handleFileChosen = file => {
        if (file.size / 1024 / 1024 > 2) {
            console.log("file is larger than 2MB");
            return;
        }

        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    const onSubmitIncidentBatch = () => {
        submitIncidentBatch(placeVisits, firebase);
    };

    return (
        <>
            <Box p={1} component="span" className={classes.root}>
                <Typography>TakeoutParser</Typography>
            </Box>
            <Box p={1} component="span" className={classes.root}>
                <TimeZonePicker />
            </Box>
            <Box p={1} component="span" className={classes.root}>
                <input type="file" accept="json" onChange={e => handleFileChosen(e.target.files[0])} />
            </Box>

            <Box p={1} component="span" className={classes.root}>
                <Button onClick={onSubmitIncidentBatch}>Submit</Button>
            </Box>

            <Box p={1} component="span" className={classes.root}>
                <Typography>Locations</Typography>
                <List>
                    {placeVisits.map(({ placeVisit }, idx) => {
                        const startTime = moment.tz(parseInt(placeVisit.duration.startTimestampMs), tzString);
                        const durationMin = parseInt((parseInt(placeVisit.duration.endTimestampMs) - parseInt(placeVisit.duration.startTimestampMs)) / 1000 / 60);

                        return (
                            <ListItem key={idx}>
                                <Box p={1} component="span" className={classes.root}>
                                    <Link
                                        href={`https://www.google.com/maps/place/?q=place_id:${placeVisit.location.placeId}
`}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {placeVisit.location.name}
                                    </Link>
                                </Box>
                                <Box p={1} component="span" className={classes.root}>
                                    {startTime.format("HH:mm Do-MMM-YYYY (ddd)")}
                                </Box>
                                <Box p={1} component="span" className={classes.root}>
                                    {`${durationMin} min`}
                                </Box>
                                <Box>
                                    ({placeVisit.location.latitudeE7 / 10000000}, {placeVisit.location.longitudeE7 / 10000000})
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </>
    );
};
