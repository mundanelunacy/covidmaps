import { RealTimeDemo } from "./RealTimeDemo";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";

const mapStateToProps = (state, props) => {
    return {
        rtDemoData: state.firestore.data.realTimeDemo
            ? state.firestore.data.realTimeDemo[props.match.params.key]
            : null,
        firebase: state.firebase,
    };
};

RealTimeDemo.propTypes = {};

RealTimeDemo.defaultProps = {};

export default compose(
    connect(mapStateToProps, {}),
    firestoreConnect((props) => {
        return [
            {
                collection: "realTimeDemo",
                doc: props.match.params.key,
            },
        ];
    })
)(RealTimeDemo);
