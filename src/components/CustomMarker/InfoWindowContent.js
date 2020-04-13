import React from "react";
import { Box, Typography } from "@material-ui/core";
import moment from "moment-timezone";

export const InfoWindowContent = ({ incident, tzString }) => {
    const googleMapsPlaceLinkRoot = "https://www.google.com/maps/place/?q=place_id:";
    return (
        <>
            <Box>
                {incident.placeId ? (
                    <Typography>
                        <a
                            href={`${googleMapsPlaceLinkRoot}${incident.placeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {incident.name}
                        </a>
                    </Typography>
                ) : (
                    <Typography>{incident.name}</Typography>
                )}
            </Box>
            <Box>
                <Typography>
                    {moment.tz(incident.startTimestampMs, tzString).format("HH:mm Do-MMM-YYYY")} (
                    {parseInt((incident.endTimestampMs - incident.startTimestampMs) / 1000 / 60)} min)
                </Typography>
            </Box>{" "}
        </>
    );
};
