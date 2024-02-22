import {z} from "zod";
import {DateTime as DateTimeSchema, Month as MonthSchema, TimeZone as TimeZoneSchema} from "../models";
import withSchema from "./with-schema";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type IDateTime = z.infer<typeof DateTimeSchema>;
type Month = z.infer<typeof MonthSchema>;
type TimeZone = z.infer<typeof TimeZoneSchema>;
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

class DateTime implements IDateTime {
    readonly dayOfMonth;
    readonly month;
    readonly year;
    readonly hours;
    readonly minutes;
    readonly seconds;
    readonly timeZone;
    constructor(
        dayOfMonth: number,
        month: Month,
        year: number,
        hours: number,
        minutes: number,
        seconds: number,
        tz: TimeZone
    ) {
        this.dayOfMonth = dayOfMonth;
        this.month = month;
        this.year = year;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.timeZone = tz;
    }
    toJSON() {
        return withSchema(DateTimeSchema).createConst({
            dayOfMonth: this.dayOfMonth,
            month: this.month,
            year: this.year,
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
            timeZone: this.timeZone,
        });
    }
    static fromJSON(dateTime: IDateTime) {
        return new DateTime(
            dateTime.dayOfMonth,
            dateTime.month,
            dateTime.year,
            dateTime.hours,
            dateTime.minutes,
            dateTime.seconds ?? 0,
            dateTime.timeZone
        );
    }
    private static monthToNumber(month: Month) {
        switch (month) {
        case "January": return 0;
        case "February": return 1;
        case "March": return 2;
        case "April": return 3;
        case "May": return 4;
        case "June": return 5;
        case "July": return 6;
        case "August": return 7;
        case "September": return 8;
        case "October": return 9;
        case "November": return 10;
        case "December": return 11;
        }
    }
    private static numberToMonth(month: number) {
        return months[month];
    }
    static utcNow() {
        const date = new Date();
        return this.utcFromDate(date);
    }
    toDate() {
        if (this.timeZone === "UTC") {
            return dayjs.utc()
                .year(this.year)
                .month(DateTime.monthToNumber(this.month))
                .date(this.dayOfMonth)
                .hour(this.hours)
                .minute(this.minutes)
                .second(this.seconds)
                .toDate();
        } else {
            return dayjs
                .tz(this.timeZone)
                .year(this.year)
                .month(DateTime.monthToNumber(this.month))
                .date(this.dayOfMonth)
                .hour(this.hours)
                .minute(this.minutes)
                .second(this.seconds)
                .toDate();
        }
    }
    static utcFromDate(date: Date) {
        return new DateTime(
            date.getUTCDate(),
            this.numberToMonth(date.getUTCMonth()),
            date.getUTCFullYear(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            "UTC",
        );
    }
    toUNIX() {
        const date = this.toDate();
        return date.getTime();
    }
    add(value: number, unit: dayjs.ManipulateType) {
        const date = dayjs(this.toDate()).add(value, unit).toDate();
        return DateTime.utcFromDate(date);
    }
    subtract(value: number, unit: dayjs.ManipulateType) {
        const date = dayjs(this.toDate()).subtract(value, unit).toDate();
        return DateTime.utcFromDate(date);
    }
}

export default DateTime;
