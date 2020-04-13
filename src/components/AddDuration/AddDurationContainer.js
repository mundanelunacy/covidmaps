import { AddDuration } from "./AddDuration";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { addManualInputTimeToBuffer, setManualInputDate, setManualInputDuration } from "../../redux/actions";

const mapStateToProps = (state) => {
    return {
        manualInputDate: state.manualInputForm.inputDate,
        manualInputDuration: state.manualInputForm.inputDuration,
        tzString: state.timezone.tzString,
    };
};

AddDuration.propTypes = {};

AddDuration.defaultProps = {};

export default compose(
    connect(mapStateToProps, {
        addManualInputTimeToBuffer,
        setManualInputDate,
        setManualInputDuration,
    }),
    firestoreConnect()
)(AddDuration);
