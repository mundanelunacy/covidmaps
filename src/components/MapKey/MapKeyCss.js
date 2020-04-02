import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    root: props => ({
        // color: theme.palette.secondary.contrastText,
        // backgroundColor: theme.palette.secondary.main
    }),
    wa2: {
        bottom: "0px",
        right: "0px",
        display: "block",
        width: "150px",
        textAlign: "center",
        padding: "5px",
        zIndex: "1000",
        position: "fixed",
        fontSize: "12px",
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        backgroundClip: "padding-box"
    },
    keyHeading: {
        fontSize: "12px",
        fontWeight: "bolder"
    },
    circleWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    circle: {
        width: "15px",
        height: "15px",
        borderRadius: "50%",

        border: "1px solid black"
    },
    blue: {
        backgroundColor: "#00F"
    },
    yellow: {
        backgroundColor: "#FF0"
    },
    red: {
        backgroundColor: "#F00"
    }
}));
