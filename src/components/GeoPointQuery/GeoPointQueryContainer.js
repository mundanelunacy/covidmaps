import { GeoPointQuery } from "./GeoPointQuery";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { submitIncident, queryIncidents } from "../../redux/actions";

const mapStateToProps = (state, props) => {
    return {
        firebase: state.firebase,
        query: state.query
    };
};

GeoPointQuery.propTypes = {};

GeoPointQuery.defaultProps = {};

export default compose(connect(mapStateToProps, { submitIncident, queryIncidents }), firestoreConnect())(GeoPointQuery);
