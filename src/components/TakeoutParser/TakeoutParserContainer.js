import { TakeoutParser } from "./TakeoutParser";
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

TakeoutParser.propTypes = {};

TakeoutParser.defaultProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect())(TakeoutParser);
