import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    root: (props) => ({
        // color: theme.palette.secondary.contrastText,
        // backgroundColor: theme.palette.secondary.main
        padding: "30px",
    }),
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        padding: 0,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        // set to drawerWidth if we want content to adjust with drawer
        // marginLeft: drawerWidth
        marginLeft: 0,
    },
}));
