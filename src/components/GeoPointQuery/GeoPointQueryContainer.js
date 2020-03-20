import { GeoPointQuery } from "./GeoPointQuery";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";

const mapDispatchToProps = dispatch => {
    return {};
};

const mapStateToProps = (state, props) => {
    return {
        firestore: state.firestore
    };
};

GeoPointQuery.propTypes = {};

GeoPointQuery.defaultProps = {};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
        // if (!props.latitude || props.longtitude){
        //     return[]
        // }
        return [];
    })
)(GeoPointQuery);
