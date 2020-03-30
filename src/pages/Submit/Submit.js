import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./SubmitCss";
import { StagingList } from "../../components/StagingList";
import { UploadStagingButton } from "../../components/UploadStagingButton";
import { SubmitCase } from "../../components/SubmitCase";
import { TakeoutParser } from "../../components/TakeoutParser";

export const Submit = ({ manualInputBuffer, manualInputValid, clearManualInput, addBufferToStaging }) => {
    const classes = useStyles();

    return (
        <Box p={1} component="span" className={classes.root}>
            <TakeoutParser />
            <SubmitCase />

            <StagingList />
            <UploadStagingButton />
        </Box>
    );
};
