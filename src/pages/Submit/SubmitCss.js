import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    root: props => ({
        // color: theme.palette.secondary.contrastText,
        // backgroundColor: theme.palette.secondary.main
        padding: "30px"
    }),
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    }
}));
