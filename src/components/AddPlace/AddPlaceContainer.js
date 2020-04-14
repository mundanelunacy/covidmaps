import { AddPlace } from "./AddPlace";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { addManualInputPlaceToBuffer, setManualInputValue } from "../../redux/actions";

// import PropTypes from "prop-types";

const mapStateToProps = (state) => {
    return {
        firebase: state.firebase,
        // placeSelectionError: state.manualInputForm.inputValue && !state.manualInputBuffer.placeId,
        inputValue: state.manualInputForm.inputValue,
        browserPos: state.browser.position,
    };
};

AddPlace.propTypes = {};

AddPlace.defaultProps = {};

export default compose(
    connect(mapStateToProps, { addManualInputPlaceToBuffer, setManualInputValue }),
    firestoreConnect()
)(AddPlace);
