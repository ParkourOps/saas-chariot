import { TimeZone, DayOfWeek } from "@/_shared_/models";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { z } from "zod";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
type TimeZone = z.infer<typeof TimeZone>;
type DayOfWeek = z.infer<typeof DayOfWeek>;

function dayOfWeekToNumber(dayOfWeek: DayOfWeek, startDay: "Monday" | "Sunday", startIndex: 0 | 1) {
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

export function readableDate(input: dayjs.ConfigType, timeZone: TimeZone = "UTC", format: string = "Do MMM YYYY") {
    if (timeZone === "UTC") {
        return dayjs(input).format(format);
    } else {
        return dayjs.tz(input, timeZone).format(format);
    }
}

export function readableDateTime(input: dayjs.ConfigType, timeZone: TimeZone = "UTC", format: string = "Do MMM YYYY, h:mma") {
    if (timeZone === "UTC") {
        return dayjs(input).format(format);
    } else {
        return dayjs.tz(input, timeZone).format(format);
    }
}

export function getNextDayOfWeek(targetDayOfWeek: DayOfWeek, timeZone: TimeZone = "UTC") {
    const currentDay = timeZone === "UTC" ? dayjs() : dayjs().tz(timeZone);
    const targetDay =
        timeZone === "UTC"
            ? dayjs().day(dayOfWeekToNumber(targetDayOfWeek, "Sunday", 0))
            : dayjs()
                .tz(timeZone)
                .day(dayOfWeekToNumber(targetDayOfWeek, "Sunday", 0));
    // Calculate the difference in days between the current day and the target day
    let dayDifference = targetDay.diff(currentDay, "day");

    // If the difference is negative, add 7 to get the positive difference
    if (dayDifference < 0) {
        dayDifference += 7;
    }

    // Calculate the nearest date for the target day
    const nearestDate = currentDay.add(dayDifference, "day");

    return nearestDate;
}

export function readableTimeForNextDayOfWeek(dayOfWeek: DayOfWeek, hours: number, minutes: number, seconds: number = 0, timeZone: TimeZone = "UTC", format: string = "h:mma") {
    let nearestDate = getNextDayOfWeek(dayOfWeek, timeZone);
    nearestDate = nearestDate.set("hours", hours).set("minutes", minutes).set("seconds", seconds);
    return nearestDate.format(format);
}
