import { TopBar } from "./TopBar";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { setDrawerOpen } from "../../redux/actions";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return { query: state.query, open: state.topBar.drawer };
};

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default compose(connect(mapStateToProps, { setDrawerOpen }), firestoreConnect())(TopBar);
