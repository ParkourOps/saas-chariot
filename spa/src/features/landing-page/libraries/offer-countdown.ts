import createCountdownToNextDateByDayOfWeek from "../utilities/create-countdown-to-next-date-by-day-of-week";
import configs from "@/configs";

const countdown = createCountdownToNextDateByDayOfWeek("Friday", configs.contact.timeZone);
console.debug("countdown started.");
countdown.begin();

export default countdown;
