import { StagingList } from "./StagingList";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";

const mapStateToProps = state => {
    return {
        incidents: state.databaseStaging.incidents,
        tzString: state.timezone.tzString
    };
};

StagingList.propTypes = {};

StagingList.defaultProps = {};

export default compose(connect(mapStateToProps, {}), firestoreConnect())(StagingList);
