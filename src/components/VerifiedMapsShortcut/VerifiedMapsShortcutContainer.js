import { VerifiedMapsShortcut } from "./VerifiedMapsShortcut";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { queryIncidents } from "../../redux/actions";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return { firebase: state.firebase, query: state.query };
};

VerifiedMapsShortcut.propTypes = {};

VerifiedMapsShortcut.defaultProps = {};

export default compose(
    connect(mapStateToProps, { queryIncidents }),
    firestoreConnect()
)(VerifiedMapsShortcut);
