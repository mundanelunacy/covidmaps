import React, { useState } from "react";
import {
    Box,
    Switch,
    FormControl,
    FormGroup,
    FormControlLabel,
    Popover,
    Typography,
} from "@material-ui/core";
import { HelpOutline as HelpOutlineIcon } from "@material-ui/icons";
import { useStyles } from "./FilterIncidentsCss";

export const FilterIncidents = ({
    verified,
    setVerifiedFilter,
    queryIncidents,
    center,
    radius,
    firebase,
}) => {
    const classes = useStyles();

    const handleVerifiedSwitch = (event) => {
        setVerifiedFilter(event.target.checked);
        queryIncidents(center.lat, center.lng, radius, firebase);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [popoverContent, setPopoverContent] = useState("");

    const handlePopoverOpen = (event, content) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(content);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const verifiedContent =
        "Excludes self-reporting.  Only displays visits from patients verified by a healthcare professional.";

    const open = Boolean(anchorEl);
    return (
        <>
            <FormControl>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={verified} onChange={handleVerifiedSwitch} color="primary" />
                        }
                        label={
                            <Box>
                                <Box component="span" display="inline">
                                    Verified only{" "}
                                </Box>
                                <Box
                                    component="span"
                                    display="inline"
                                    onMouseEnter={(e) => handlePopoverOpen(e, verifiedContent)}
                                    onMouseLeave={handlePopoverClose}
                                    className={classes.popoverSmallIconAdjustment}
                                >
                                    <HelpOutlineIcon fontSize="small" />
                                </Box>
                            </Box>
                        }
                    />
                </FormGroup>
            </FormControl>

            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{popoverContent}</Typography>
            </Popover>
        </>
    );
};
