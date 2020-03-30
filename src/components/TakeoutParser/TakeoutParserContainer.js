import { TakeoutParser } from "./TakeoutParser";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
// import PropTypes from "prop-types";
import { loadParsedVisits, importTakeoutToStaging } from "../../redux/actions";

const mapStateToProps = state => {
    return {
        firebase: state.firebase,
        placeVisits: state.parser ? state.parser.placeVisits : [],
        tzString: state.timezone.tzString
    };
};

TakeoutParser.propTypes = {};

TakeoutParser.defaultProps = {};

export default compose(
    connect(mapStateToProps, { loadParsedVisits, importTakeoutToStaging }),
    firestoreConnect()
)(TakeoutParser);
