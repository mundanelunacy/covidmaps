import { StagingList } from "./StagingList";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { deleteFromStaging, deleteFromStagingFs } from "../../redux/actions";

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
        incidents,
        tzString: state.timezone.tzString,
        firebase: state.firebase,
    };
};

StagingList.propTypes = {};

StagingList.defaultProps = {};

export default compose(
    connect(mapStateToProps, { deleteFromStaging, deleteFromStagingFs }),
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
)(StagingList);
