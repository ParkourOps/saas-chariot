import { z } from "zod";
import { TimeZone, DayOfWeek } from "@/_shared_/models";
export type TimeZone = z.infer<typeof TimeZone>;
export type DayOfWeek = z.infer<typeof DayOfWeek>;
import dayjs from "@/libraries/dayjs";

export function getDayOfWeekAsNumber(dayOfWeek: DayOfWeek, startDay: "Monday" | "Sunday", startIndex: 0 | 1) {
    switch (dayOfWeek) {
    case "Monday":
        return startDay === "Monday" ? startIndex : startIndex + 1;
    case "Tuesday":
        return startDay === "Monday" ? startIndex + 1 : startIndex + 2;
    case "Wednesday":
        return startDay === "Monday" ? startIndex + 2 : startIndex + 3;
    case "Thursday":
        return startDay === "Monday" ? startIndex + 3 : startIndex + 4;
    case "Friday":
        return startDay === "Monday" ? startIndex + 4 : startIndex + 5;
    case "Saturday":
        return startDay === "Monday" ? startIndex + 5 : startIndex + 6;
    case "Sunday":
        return startDay === "Monday" ? startIndex + 6 : startIndex;
    }
}

// export function formatDate(input: dayjs.ConfigType, timeZone: TimeZone = "UTC", format: string = "Do MMM YYYY") {
//     if (timeZone === "UTC") {
//         return dayjs(input).format(format);
//     } else {
//         return dayjs.tz(input, timeZone).format(format);
//     }
// }

// export function formatDateTime(input: dayjs.ConfigType, timeZone: TimeZone = "UTC", format: string = "Do MMM YYYY, h:mma") {
//     if (timeZone === "UTC") {
//         return dayjs(input).format(format);
//     } else {
//         return dayjs.tz(input, timeZone).format(format);
//     }
// }

export function getNextDateByDayOfWeek(startDate: dayjs.Dayjs, targetDayOfWeek: DayOfWeek) {
    const _targetDayOfWeek = getDayOfWeekAsNumber(targetDayOfWeek, "Sunday", 0);
    const targetDate = startDate.day(_targetDayOfWeek).hour(0).minute(0).second(0);

    // console.debug({
    //     targetDayOfWeek: `${targetDayOfWeek} (${_targetDayOfWeek})`,
    //     startDate: startDate.toISOString(),
    //     targetDate: targetDate.toISOString(),
    // });

    // Calculate the difference between the current day and the target day, in seconds resolution for accuracy
    let secondDifference = targetDate.diff(startDate, "second");

    // console.debug({
    //     secondDifference,
    // });

    // If the difference is negative or none, add 7 to get the positive difference
    if (secondDifference <= 0) {
        secondDifference += 7 * 24 * 60 * 60;
    }

    // console.debug({
    //     secondDifference,
    // });

    // Calculate the nearest date for the target day
    const nearestDate = startDate.add(secondDifference, "second");

    // console.debug({
    //     nearestDate: nearestDate.toISOString(),
    // })

    return nearestDate;
}
