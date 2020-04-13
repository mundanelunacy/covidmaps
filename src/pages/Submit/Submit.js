import React from "react";
import { Box, CssBaseline, Grid, Typography, Link } from "@material-ui/core";
import { useStyles } from "./SubmitCss";
import { StagingList } from "../../components/StagingList";
import { UploadStagingButton } from "../../components/UploadStagingButton";
import { SubmitCase } from "../../components/SubmitCase";
import { TakeoutParser } from "../../components/TakeoutParser";
import { TopBar } from "../../components/TopBar";
import { Countdown } from "../../components/Countdown";
import clsx from "clsx";
import { useHistory, Link as RouterLink } from "react-router-dom";

export const Submit = ({ setSubmittedPlaces, submittedPlaces, open }) => {
    const classes = useStyles();
    const history = useHistory();
    const redirectTimeout = 3;

    if (submittedPlaces) {
        setTimeout(() => {
            setSubmittedPlaces(0);
            history.push("/");
        }, redirectTimeout * 1000);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />

            <TopBar />
            <main
                //Todo move this state to redux
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                {submittedPlaces ? (
                    <Box textAlign="center">
                        <Typography variant="h3">uploaded {submittedPlaces} locations</Typography>
                        <Typography variant="h6">
                            <Link component={RouterLink} to="/">
                                you will be redirected back in <Countdown time={redirectTimeout - 1} />{" "}
                                seconds
                            </Link>
                        </Typography>
                    </Box>
                ) : (
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
                )}
            </main>
        </div>
    );
};
