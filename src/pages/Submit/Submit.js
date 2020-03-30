import React from "react";
import { Box, CssBaseline, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./SubmitCss";
import { StagingList } from "../../components/StagingList";
import { UploadStagingButton } from "../../components/UploadStagingButton";
import { SubmitCase } from "../../components/SubmitCase";
import { TakeoutParser } from "../../components/TakeoutParser";
import { TopBar } from "../../components/TopBar";

export const Submit = ({ manualInputBuffer, manualInputValid, clearManualInput, addBufferToStaging }) => {
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

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Box mt={2}>
                            <Typography variant="h5">Step 1: Import Google Location History</Typography>
                        </Box>
                        <Box mt={2}>
                            <TakeoutParser />
                        </Box>
                        <Box mt={5}>
                            <Typography variant="h5">Step 2: Manually enter Location History</Typography>
                        </Box>
                        <Box mt={2}>
                            <SubmitCase />
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box mt={2}>
                            <Typography variant="h5">Step 3: Review List and Upload</Typography>
                        </Box>
                        <Box mt={2}>
                            <UploadStagingButton />
                        </Box>
                        <Box mt={2}>
                            <StagingList />
                        </Box>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};
