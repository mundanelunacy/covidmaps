import { SearchForm } from "./SearchForm";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { queryIncidents, setZoom } from "../../redux/actions";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return { firebase: state.firebase };
};

SearchForm.propTypes = {};

SearchForm.defaultProps = {};

export default compose(connect(mapStateToProps, { queryIncidents, setZoom }), firestoreConnect())(SearchForm);
