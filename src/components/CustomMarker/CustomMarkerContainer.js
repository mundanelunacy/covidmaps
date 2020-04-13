import { CustomMarker } from "./CustomMarker";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        tzString: state.timezone.tzString,
    };
};

CustomMarker.propTypes = {};

CustomMarker.defaultProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect())(CustomMarker);
