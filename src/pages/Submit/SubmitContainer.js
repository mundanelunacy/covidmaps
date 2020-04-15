import { Submit } from "./Submit";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { setSubmittedPlaces } from "../../redux/actions";

const mapStateToProps = (state) => {
    return {
        stagingIncidents: state.databaseStaging.incidents,
        submittedPlaces: state.submitPage.submittedPlaces,
        open: state.topBar.drawer,
    };
};

Submit.propTypes = {};

Submit.defaultProps = {};

export default compose(
    connect(mapStateToProps, {
        setSubmittedPlaces,
    }),
    firestoreConnect()
)(Submit);
