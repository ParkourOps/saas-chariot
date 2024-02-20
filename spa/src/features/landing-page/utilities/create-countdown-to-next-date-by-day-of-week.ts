import { getNextDateByDayOfWeek, type DayOfWeek, type TimeZone } from "@/utilities/date-time";
import dayjs from "@/libraries/dayjs";
import { ref } from "vue";

export default function(targetDayOfWeek: DayOfWeek, timeZone: TimeZone = "UTC") {
    const now = timeZone === "UTC" ? dayjs().utc() : dayjs().tz(timeZone);
    const target = getNextDateByDayOfWeek(now, targetDayOfWeek);

    const daysRemaining = ref(0);
    const hoursRemaining = ref(0);
    const minutesRemaining = ref(0);
    const secondsRemaining = ref(0);

    return {
        target,
        daysRemaining,
        hoursRemaining,
        minutesRemaining,
        secondsRemaining,
        begin() {
            setInterval(() => {
                // Get the current date and time
                const currentTime = new Date().getTime();

                // Calculate the remaining time in milliseconds
                const timeRemaining = target.toDate().getTime() - currentTime;

                if (timeRemaining <= 0) {
                    // Set to zero
                    daysRemaining.value = 0;
                    hoursRemaining.value = 0;
                    minutesRemaining.value = 0;
                    secondsRemaining.value = 0;
                } else {
                    // Calculate days, hours, minutes, and seconds
                    daysRemaining.value = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                    hoursRemaining.value = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    minutesRemaining.value = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                    secondsRemaining.value = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                }
            }, 1000);
        },
    };
}
