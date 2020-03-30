import { SubmitCase } from "./SubmitCase";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { clearManualInput, addBufferToStaging } from "../../redux/actions";

const mapStateToProps = state => {
    return {
        manualInputBuffer: state.manualInputBuffer,
        manualInputValid:
            state.manualInputBuffer.startTimestampMs &&
            state.manualInputBuffer.endTimestampMs &&
            state.manualInputBuffer.placeId,
        stagingIncidents: state.databaseStaging.incidents
    };
};

SubmitCase.propTypes = {};

SubmitCase.defaultProps = {};

export default compose(
    connect(mapStateToProps, {
        clearManualInput,
        addBufferToStaging
    }),
    firestoreConnect()
)(SubmitCase);
