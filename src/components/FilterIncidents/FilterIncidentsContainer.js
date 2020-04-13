import { FilterIncidents } from "./FilterIncidents";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { setVerifiedFilter } from "../../redux/actions";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return {
        verified: state.filter.verified,
    };
};

FilterIncidents.propTypes = {};

FilterIncidents.defaultProps = {};

export default compose(connect(mapStateToProps, { setVerifiedFilter }), firestoreConnect())(FilterIncidents);
