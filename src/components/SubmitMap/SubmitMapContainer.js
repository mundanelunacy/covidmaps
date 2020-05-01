import { SubmitMap } from "./SubmitMap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";

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
        stagingIncidents: incidents,
    };
};

SubmitMap.propTypes = {};
SubmitMap.defaultProps = {};

export default compose(
    connect(mapStateToProps, {}),
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
)(SubmitMap);
