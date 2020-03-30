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
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Link
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
    Add as AddIcon
} from "@material-ui/icons";

import { SearchForm } from "../../components/SearchForm";
import { useStyles } from "./TopBarCss";
import clsx from "clsx";

import { Link as RouterLink } from "react-router-dom";

export const TopBar = ({ query }) => {
    const classes = useStyles();
    const theme = useTheme();

    //Todo move this state to Redux
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open
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
                    <Link component={RouterLink} to="/">
                        <img src="/logo.png" className={classes.logo} alt="logo" />
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        Covidmaps.org [Prototype]
                    </Typography>

                    <SearchForm />
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
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
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
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <List>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <FilterListIcon></FilterListIcon>
                                        </ListItemIcon>
                                        <ListItemText>Filters</ListItemText>
                                    </ListItem>
                                </List>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>(TBD) Filter Options etc.</ExpansionPanelDetails>
                        </ExpansionPanel>
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
