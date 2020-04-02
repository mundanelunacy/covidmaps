import React, { useState } from "react";
import { useStyles } from "./VerifiedMapsShortcutCss";
import { Typography, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { LocationOn as LocatioOnIcon, HighlightOff as CloseIcon } from "@material-ui/icons";

export const VerifiedMapsShortcut = ({ firebase, queryIncidents }) => {
    const classes = useStyles();

    const [menuClosed, setMenuClose] = useState(false);
    const [closeButtonHover, setCloseButtonHover] = useState(false);

    return (
        <div className={classes.wa2} style={menuClosed ? { display: "none" } : {}}>
            <Typography>Verified Maps</Typography>
            <List>
                <ListItem
                    className={classes.cursorPointer}
                    onClick={() => queryIncidents(37.5172, 127.0473, 10, firebase)}
                >
                    <ListItemIcon>
                        <LocatioOnIcon />
                    </ListItemIcon>
                    <ListItemText>Korea</ListItemText>
                </ListItem>
                <ListItem
                    className={classes.cursorPointer}
                    onClick={() => queryIncidents(32.0853, 34.7818, 10, firebase)}
                >
                    <ListItemIcon>
                        <LocatioOnIcon />
                    </ListItemIcon>
                    <ListItemText>Isreal</ListItemText>
                </ListItem>
            </List>
            <div
                className={`${classes.closeIcon} ${classes.cursorPointer} ${
                    closeButtonHover ? classes.colorBlack : classes.colorGrey
                }`}
                onMouseOver={() => setCloseButtonHover(true)}
                onMouseOut={() => setCloseButtonHover(false)}
                onClick={() => setMenuClose(true)}
            >
                <CloseIcon />
            </div>
        </div>
    );
};
