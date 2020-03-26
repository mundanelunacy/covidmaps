import React from "react";
import {
    // Fab,
    CssBaseline,
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
    ExpansionPanelDetails
} from "@material-ui/core";
import {
    Menu as MenuIcon,
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon,
    // Search as SearchIcon,
    FilterList as FilterListIcon,
    ExpandMore as ExpandMoreIcon,
    Info as InfoIcon,
    VisibilityOff as VisibilityOffIcon,
    Favorite as FavoriteIcon,
    // Language as LanguageIcon,
    Add as AddIcon
} from "@material-ui/icons";
import { DisplayMap } from "../../components/DisplayMap";
import { SearchForm } from "../../components/SearchForm";
import { useStyles } from "./LandingPageCss";
import clsx from "clsx";

export const LandingPage = ({ query }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />

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
                    <img src="/logo.png" className={classes.logo} alt="logo" />
                    <Typography variant="h6" className={classes.title}>
                        Coronamaps.org [Prototype]
                    </Typography>
                    {/* <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="location e.g. Shinjuku"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ "aria-label": "search" }}
                        />
                    </div> */}

                    <SearchForm />

                    {/* <div className={classes.grow} /> */}
                    {/* <Button startIcon={<LanguageIcon />} className={classes.languageButton}>
                        <Typography>En</Typography>
                    </Button> */}

                    <Button
                        startIcon={<AddIcon />}
                        color="secondary"
                        variant="contained"
                        size="large"
                        className={classes.submitButton}
                    >
                        <Typography>Submit Case</Typography>
                    </Button>
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
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open
                })}
            >
                <div className={classes.drawerHeader} />
                <DisplayMap initialCenter={query.center} />
            </main>
            {/* <Fab variant="extended" color="secondary" className={classes.submitButtonFab}>
                <AddIcon className={classes.extendedIcon} />
                Submit Case
            </Fab> */}
        </div>
    );
};
