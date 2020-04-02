import React from "react";
import { useStyles } from "./MapKeyCss";

export const MapKey = props => {
    const classes = useStyles();
    return (
        <div className={classes.wa2}>
            <span className={classes.keyHeading}>Visit date</span>
            <div className={classes.circleWrapper}>
                <div className={`${classes.circle} ${classes.blue}`} />
                <span>4 days ~ 14 days</span>
            </div>
            <div className={classes.circleWrapper}>
                <div className={`${classes.circle} ${classes.yellow}`} />
                <span>24 hours ~ 4 days</span>
            </div>
            <div className={classes.circleWrapper}>
                <div className={`${classes.circle} ${classes.red}`} />
                <span>Less than 24 hours</span>
            </div>
        </div>
    );
};
