import useFunctions from "@/libraries/firebase/use-functions";
import SendActionLink from "@/_shared_/models/features/action-link/api/SendActionLink";

export default function () {
    const functions = useFunctions();
    return {
        sendActionLink: functions.createCaller(SendActionLink),
    };
}
