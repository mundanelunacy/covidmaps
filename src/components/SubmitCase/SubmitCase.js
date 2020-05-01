import React from "react";
import { Box, Button } from "@material-ui/core";
// import { useStyles } from "./SubmitCaseCss";
import { AddPlace } from "../AddPlace";
import { AddDuration } from "../AddDuration";

export const SubmitCase = ({
    manualInputBuffer,
    manualInputValid,
    clearManualInput,
    addBufferToStaging,
    addBufferToStagingFs,
    match,
    firebase,
}) => {
    return (
        <>
            <AddPlace />
            <AddDuration />
            <Box mt={2}>
                <Button
                    variant="contained"
                    disabled={!manualInputValid}
                    onClick={() => {
                        if (match.params.token) {
                            addBufferToStagingFs(manualInputBuffer, firebase, match.params.token);
                        } else {
                            addBufferToStaging(manualInputBuffer);
                        }

                        clearManualInput();
                    }}
                >
                    Add to List
                </Button>
            </Box>
        </>
    );
};
