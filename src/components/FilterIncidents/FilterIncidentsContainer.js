import { FilterIncidents } from "./FilterIncidents";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { setVerifiedFilter, queryIncidents } from "../../redux/actions";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return {
        verified: state.filter.verified,
        center: state.query.center,
        radius: state.query.radius,
        firebase: state.firebase,
    };
};

FilterIncidents.propTypes = {};

FilterIncidents.defaultProps = {};

export default compose(
    connect(mapStateToProps, { setVerifiedFilter, queryIncidents }),
    firestoreConnect()
)(FilterIncidents);
