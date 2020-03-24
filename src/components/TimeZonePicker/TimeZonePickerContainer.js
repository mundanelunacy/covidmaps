import { TimeZonePicker } from "./TimeZonePicker";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { styles } from "./TimeZonePickerCss";
import { firestoreConnect } from "react-redux-firebase";
import { changeTimeZone } from "../../redux/actions";

const mapStateToProps = state => {
    return { tzString: state.timezone.tzString };
};

TimeZonePicker.propTypes = {
    tzString: PropTypes.string.isRequired,
    changeTimeZone: PropTypes.func.isRequired
};

TimeZonePicker.defaultProps = {};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        { changeTimeZone }
    ),
    firestoreConnect()
)(TimeZonePicker);
