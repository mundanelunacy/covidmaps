import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Chip } from "@material-ui/core";
import { useStyles } from "./RealTimeDemoCss";

export const RealTimeDemo = ({ firebase, rtDemoData, match }) => {
    const classes = useStyles();
    const [text, setText] = useState("");
    const [textArr, setTextArr] = useState([]);
    const key = match.params.key;

    const setRtDemoData = (docId, data) => {
        firebase.firestore().collection("realTimeDemo").doc(docId).set({ data });
    };

    const inputChange = (event) => {
        setText(event.target.value);
    };
    const handleSubmit = () => {
        let ret = [];
        if (rtDemoData) {
            ret = rtDemoData.data.map((data) => data);
        }
        ret.push(text);
        setRtDemoData(key, ret);
        setText("");
    };

    const handleDelete = (index) => {
        setTextArr(textArr.splice(index, 1));
        setRtDemoData(key, textArr);
    };

    const handleEnterKey = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    useEffect(() => {
        if (rtDemoData && rtDemoData.data) {
            setTextArr(rtDemoData.data.map((data) => data));
        }
    }, [rtDemoData]);

    return key ? (
        <>
            <Box p={1} component="span" className={classes.root}>
                <TextField value={text} onChange={inputChange} onKeyDown={handleEnterKey} />
                <Button onClick={handleSubmit}>Submit</Button>
            </Box>
            <Box>
                {textArr.map((data, index) => {
                    return <Chip key={index} label={data} onDelete={() => handleDelete(index)}></Chip>;
                })}
            </Box>
        </>
    ) : (
        <Box>No key</Box>
    );
};
