import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    root: (props) => ({
        // color: theme.palette.secondary.contrastText,
        // backgroundColor: theme.palette.secondary.main
    }),
    popover: {
        pointerEvents: "none",
    },

    popoverSmallIconAdjustment: {
        position: "relative",
        top: "5px",
    },
    paper: {
        padding: theme.spacing(1),
    },
}));
