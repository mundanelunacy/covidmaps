import React from "react";
import { CssBaseline } from "@material-ui/core";

import { TopBar } from "../../components/TopBar";
import { DisplayMap } from "../../components/DisplayMap";
import { useStyles } from "./LandingPageCss";
// import clsx from "clsx";
import { MapKey } from "../../components/MapKey";
import { VerifiedMapsShortcut } from "../../components/VerifiedMapsShortcut";

export const LandingPage = ({ query }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />

            <TopBar />
            <main
            //Todo move this state to redux
            // className={clsx(classes.content, {
            //     [classes.contentShift]: open
            // })}
            >
                <div className={classes.drawerHeader} />
                <DisplayMap initialCenter={query.center} />
                <MapKey />
                <VerifiedMapsShortcut />
            </main>
        </div>
    );
};
