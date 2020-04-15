import { SubmitMap } from "./SubmitMap";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return {
        stagingIncidents: state.databaseStaging.incidents,
    };
};

SubmitMap.propTypes = {};
SubmitMap.defaultProps = {};

export default connect(mapStateToProps, {})(SubmitMap);
