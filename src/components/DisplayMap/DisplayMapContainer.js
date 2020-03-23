import { DisplayMap } from "./DisplayMap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { apiKey } from "../../config/GoogleMapsAPIKey";
import { GoogleApiWrapper } from "google-maps-react";

const mapDispatchToProps = dispatch => {
    return {};
};

const mapStateToProps = state => {
    return {};
};

DisplayMap.propTypes = {};

DisplayMap.defaultProps = {};

export default compose(GoogleApiWrapper({ apiKey }), connect(mapStateToProps, mapDispatchToProps), firestoreConnect())(DisplayMap);
