import React from "react";
import { Box, Button } from "@material-ui/core";
// import { useStyles } from "./SubmitCaseCss";
import { AddPlace } from "../AddPlace";
import { AddDuration } from "../AddDuration";

export const SubmitCase = ({ manualInputBuffer, manualInputValid, clearManualInput, addBufferToStaging }) => {
    // const classes = useStyles();

    return (
        <>
            <AddPlace />
            <AddDuration />
            <Box mt={2}>
                <Button
                    variant="contained"
                    disabled={!manualInputValid}
                    onClick={() => {
                        addBufferToStaging(manualInputBuffer);
                        clearManualInput();
                    }}
                >
                    Add to List
                </Button>
            </Box>
        </>
    );
};
