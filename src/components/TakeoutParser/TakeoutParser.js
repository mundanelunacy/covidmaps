import React from "react";

import { Input } from "@material-ui/core";
// import { useStyles } from "./TakeoutParserCss";

export const TakeoutParser = ({ loadParsedVisits, placeVisits, firebase, importTakeoutToStaging }) => {
    // const classes = useStyles();

    let fileReader;

    const handleFileRead = e => {
        // Filter out Timeline objects that are
        // 1.  NOT places
        // 2.  Have a duration less than 30min
        const placeVisits = JSON.parse(fileReader.result).timelineObjects.filter(
            obj =>
                obj.placeVisit &&
                obj.placeVisit.location.locationConfidence > 50 &&
                (parseInt(obj.placeVisit.duration.endTimestampMs) -
                    parseInt(obj.placeVisit.duration.startTimestampMs)) /
                    1000 /
                    60 >
                    30
        );

        loadParsedVisits(placeVisits);
        importTakeoutToStaging(placeVisits, firebase);
    };

    const handleFileChosen = file => {
        if (file.size / 1024 / 1024 > 2) {
            console.log("file is larger than 2MB");
            return;
        }

        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return (
        <>
            <Input type="file" accept="json" onChange={e => handleFileChosen(e.target.files[0])} />
        </>
    );
};
