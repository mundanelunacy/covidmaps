import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./TestLPCss";
import { Link as RouterLink } from "react-router-dom";
import { List, ListItem, Typography, Link } from "@material-ui/core";

export const TestLP = props => {
    const classes = useStyles();
    return (
        <Box p={1} component="span" className={classes.root}>
            <List>
                <ListItem>
                    <Link component={RouterLink} to="/map">
                        <Typography>Map Component</Typography>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/submit">
                        <Typography>Parser</Typography>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/lp">
                        <Typography>Landing Page</Typography>
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
};
