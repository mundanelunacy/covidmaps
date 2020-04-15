import React from "react";

export class GetBrowserPosition extends React.Component {
    componentDidMount = () => {
        const { setBrowserPosition } = this.props;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setBrowserPosition(pos.coords);
            });
        }
    };

    render = () => {
        return null;
    };
}
