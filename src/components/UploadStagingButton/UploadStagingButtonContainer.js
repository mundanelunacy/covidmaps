import { UploadStagingButton } from "./UploadStagingButton";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import {
    clearManualInput,
    uploadStagingToDb,
    clearStaging,
    clearStagingFs,
    setSubmittedPlaces,
    queryIncidents,
} from "../../redux/actions";

const mapStateToProps = (state, props) => {
    let incidents;

    if (
        props.match.params.token &&
        state.firestore.data.submitSessions &&
        state.firestore.data.submitSessions[props.match.params.token]
    ) {
        incidents = state.firestore.data.submitSessions[props.match.params.token].incidents;
    } else {
        incidents = state.databaseStaging.incidents;
    }

    return {
        firebase: state.firebase,
        uploadStagingValid: incidents.length,
        stagingIncidents: incidents,
        query: state.query,
    };
};

UploadStagingButton.propTypes = {};

UploadStagingButton.defaultProps = {};

export default compose(
    connect(mapStateToProps, {
        clearManualInput,
        uploadStagingToDb,
        clearStaging,
        clearStagingFs,
        setSubmittedPlaces,
        queryIncidents,
    }),
    firestoreConnect((props) => {
        if (props.match.params.token) {
            return [
                {
                    collection: "submitSessions",
                    doc: props.match.params.token,
                },
            ];
        }
        return [];
    })
)(UploadStagingButton);
