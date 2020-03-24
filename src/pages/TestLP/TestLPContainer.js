import { TestLP } from "./TestLP";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";

const mapDispatchToProps = dispatch => {
    return {};
};

const mapStateToProps = state => {
    return {};
};

TestLP.propTypes = {};

TestLP.defaultProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect())(TestLP);
