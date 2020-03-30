import { SubmitCase } from "./SubmitCase";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import {
    addManualInputTimeToBuffer,
    setManualInputDate,
    setManualInputDuration,
    clearManualInput,
    addBufferToStaging,
    uploadStagingToDb,
    clearStaging
} from "../../redux/actions";

const mapStateToProps = state => {
    return {
        firebase: state.firebase,
        manualInputBuffer: state.manualInputBuffer,
        manualInputValid:
            state.manualInputBuffer.startTimestampMs &&
            state.manualInputBuffer.endTimestampMs &&
            state.manualInputBuffer.placeId,

        uploadStagingValid: state.databaseStaging.incidents.length,
        manualInputDate: state.manualInputForm.inputDate,
        manualInputDuration: state.manualInputForm.inputDuration,
        stagingIncidents: state.databaseStaging.incidents
    };
};

SubmitCase.propTypes = {};

SubmitCase.defaultProps = {};

export default compose(
    connect(mapStateToProps, {
        addManualInputTimeToBuffer,
        setManualInputDate,
        setManualInputDuration,
        clearManualInput,
        addBufferToStaging,
        uploadStagingToDb,
        clearStaging
    }),
    firestoreConnect()
)(SubmitCase);
