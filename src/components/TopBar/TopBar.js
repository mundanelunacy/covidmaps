import React from "react";
import {
    // Fab,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    // InputBase,
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Link,
    Hidden,
} from "@material-ui/core";
import {
    Menu as MenuIcon,
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
    FilterList as FilterListIcon,
    ExpandMore as ExpandMoreIcon,
    Info as InfoIcon,
    VisibilityOff as VisibilityOffIcon,
    Favorite as FavoriteIcon,
    Add as AddIcon,
} from "@material-ui/icons";

import { FilterIncidents } from "../FilterIncidents";

import { SearchForm } from "../../components/SearchForm";
import { useStyles } from "./TopBarCss";
import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

export const TopBar = ({ open, setDrawerOpen }) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link component={RouterLink} to="/" style={{ color: "white" }}>
                        <img src="/logo.png" className={classes.logo} alt="logo" />
                    </Link>
                    <Hidden xsDown>
                        <Typography variant="h6" className={classes.title}>
                            <Link component={RouterLink} to="/" style={{ color: "white" }} underline="none">
                                Covidmaps.org [Prototype]
                            </Link>
                        </Typography>
                    </Hidden>

                    <SearchForm />
                    <Hidden smDown>
                        <Link component={RouterLink} to="/submit">
                            <Button
                                startIcon={<AddIcon />}
                                color="secondary"
                                variant="contained"
                                size="large"
                                className={classes.submitButton}
                            >
                                <Typography>Submit Case</Typography>
                            </Button>
                        </Link>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <List>
                    <ListItemText>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <List>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <FilterListIcon></FilterListIcon>
                                        </ListItemIcon>
                                        <ListItemText>Filters</ListItemText>
                                    </ListItem>
                                </List>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FilterIncidents />
                            </AccordionDetails>
                        </Accordion>
                    </ListItemText>
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <VisibilityOffIcon />
                        </ListItemIcon>
                        <ListItemText>Privacy</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText>Donate</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};
