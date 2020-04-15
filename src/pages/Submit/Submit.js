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
import { SubmitMap } from "../../components/SubmitMap";

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
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Box mt={2}>
                                        <Typography variant="h6">
                                            Step 1: Import Google Location History
                                        </Typography>
                                    </Box>
                                    <Box mt={2}>
                                        <TakeoutParser />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box mt={2}>
                                        <Typography variant="h6">
                                            Step 2: Manually enter Location History
                                        </Typography>
                                    </Box>
                                    <Box mt={2}>
                                        <SubmitCase />
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box mt={2}>
                                <Typography variant="h6">Step 3: Review List and Upload</Typography>
                            </Box>
                            <Box mt={2}>
                                <UploadStagingButton />
                            </Box>
                            <Box mt={2}>
                                <StagingList />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box mt={2}>
                                <SubmitMap />
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </main>
        </div>
    );
};
