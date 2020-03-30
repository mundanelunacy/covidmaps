import { UploadStagingButton } from "./UploadStagingButton";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { clearManualInput, uploadStagingToDb, clearStaging } from "../../redux/actions";

const mapStateToProps = state => {
    return {
        firebase: state.firebase,
        uploadStagingValid: state.databaseStaging.incidents.length,
        stagingIncidents: state.databaseStaging.incidents
    };
};

UploadStagingButton.propTypes = {};

UploadStagingButton.defaultProps = {};

export default compose(
    connect(mapStateToProps, {
        clearManualInput,
        uploadStagingToDb,
        clearStaging
    }),
    firestoreConnect()
)(UploadStagingButton);
