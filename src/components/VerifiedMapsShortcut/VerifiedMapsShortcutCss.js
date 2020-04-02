import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
    root: props => ({
        // color: theme.palette.secondary.contrastText,
        // backgroundColor: theme.palette.secondary.main
    }),
    wa2: {
        top: theme.mixins.toolbar.minHeight + 20,
        left: 20,
        display: "block",
        textAlign: "center",
        padding: "5px",
        zIndex: "1000",
        position: "fixed",
        backgroundColor: "rgba(255,255,255,0.6)",

        borderRadius: "4px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        backgroundClip: "padding-box"
    },
    closeIcon: {
        position: "absolute",
        top: -12,
        right: -12
    },
    colorGrey: {
        color: "grey"
    },
    colorBlack: {
        color: "black"
    },

    cursorPointer: {
        cursor: "pointer"
    }
}));
