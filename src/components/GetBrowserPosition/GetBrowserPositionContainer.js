import { GetBrowserPosition } from "./GetBrowserPosition";
import { connect } from "react-redux";
import { setBrowserPosition } from "../../redux/actions";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, { setBrowserPosition })(GetBrowserPosition);
