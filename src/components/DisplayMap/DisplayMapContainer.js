import { DisplayMap } from "./DisplayMap";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { apiKey } from "../../config/GoogleMapsAPIKey";
import { GoogleApiWrapper } from "google-maps-react";
import { onMarkerClick, onMapClicked, onCenterMoved } from "../../redux/actions";

const mapStateToProps = state => {
    return { displayMap: state.displayMap };
};

DisplayMap.propTypes = {};

DisplayMap.defaultProps = {};

export default compose(GoogleApiWrapper({ apiKey }), connect(mapStateToProps, { onMarkerClick, onMapClicked, onCenterMoved }), firestoreConnect())(DisplayMap);
