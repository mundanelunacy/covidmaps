import React from "react";
//Todo - write useEffect cleanup function
export const Countdown = ({ time }) => {
    const [counter, setCounter] = React.useState(time);

    React.useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
    }, [counter]);

    return <span>{counter}</span>;
};
