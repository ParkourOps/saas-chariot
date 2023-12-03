import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export default function(dateTime: string) {
    return dayjs(dateTime).format("Do MMM, h:mma");
}
