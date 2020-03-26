import { DisplayMap } from "./DisplayMap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { onMarkerClick, onMapClicked, centerMoved, queryIncidents } from "../../redux/actions";

const mapStateToProps = state => {
    return {
        firebase: state.firebase,
        displayMap: state.displayMap,
        query: state.query,
        tzString: state.timezone.tzString
    };
};

DisplayMap.propTypes = {};

DisplayMap.defaultProps = {};

export default compose(
    connect(mapStateToProps, { onMarkerClick, onMapClicked, centerMoved, queryIncidents }),
    firestoreConnect()
)(DisplayMap);
