import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./BoilerPlateCss";

export const BoilerPlate = props => {
    const classes = useStyles();
    return (
        <Box p={1} component="span" className={classes.root}>
            BoilerPlate
        </Box>
    );
};
