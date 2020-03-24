import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./TakeoutParserCss";

export const TakeoutParser = props => {
    const classes = useStyles();
    return (
        <Box p={1} component="span" className={classes.root}>
            TakeoutParser
        </Box>
    );
};
