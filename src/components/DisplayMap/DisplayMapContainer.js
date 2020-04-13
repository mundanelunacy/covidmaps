import { DisplayMap } from "./DisplayMap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { centerMoved, queryIncidents, setZoom } from "../../redux/actions";

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase,
        query: state.query,
        zoom: state.displayMap.zoom,
    };
};

DisplayMap.propTypes = {};

DisplayMap.defaultProps = {};

export default compose(
    connect(mapStateToProps, { centerMoved, queryIncidents, setZoom }),
    firestoreConnect()
)(DisplayMap);
