import moment from "moment-timezone";
import { DAY_MILLISECONDS, HOUR_MILLISECONDS, MINUTE_MILLISECONDS } from "../data/timeConstants";

export const createTodayTs = tzString => {
    return (
        moment
            .tz(
                [
                    moment
                        .tz(Date.now(), tzString)
                        .format()
                        .split("T")[0],
                    "00:00:00"
                ].join("T"),
                tzString
            )
            .unix() * 1000
    );
};

export const createTimesArr = (availRanges, todayTs, noticeHours) => {
    const lastNotice = Date.now() + noticeHours * HOUR_MILLISECONDS;

    let times = [];
    availRanges.forEach(availRange => {
        let counter = todayTs;

        if (availRange.end > lastNotice) {
            while (counter < todayTs + DAY_MILLISECONDS) {
                if (counter >= availRange.start && counter < availRange.end && counter > lastNotice) {
                    times.push(counter);
                }
                counter += 30 * MINUTE_MILLISECONDS;
            }
        }
    });

    return times;
};

export const createAvailabilitiesObj = (availRanges, tzString, numDays, noticeHours) => {
    let availabilitiesObj = {
        todayTs: createTodayTs(tzString),
        tzString,
        days: []
    };

    let dayCount = availabilitiesObj.todayTs;

    while (dayCount < availabilitiesObj.todayTs + numDays * DAY_MILLISECONDS) {
        availabilitiesObj.days.push({
            dayTs: dayCount,
            times: createTimesArr(availRanges, dayCount, noticeHours)
        });
        dayCount += DAY_MILLISECONDS;
    }

    return availabilitiesObj;
};

export const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const getTzString = () => {
    return moment.tz.guess();
};
