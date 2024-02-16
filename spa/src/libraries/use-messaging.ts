import useFunctions from "@/libraries/firebase/use-functions";
import SendTemplatedEmail from "@/_shared_/models/features/email-messaging/api/SendTemplatedEmail";
import SendTextOnlyEmail from "@/_shared_/models/features/email-messaging/api/SendTextOnlyEmail";

export default function () {
    const functions = useFunctions();
    return {
        email: {
            sendTemplatedEmail: functions.createCaller(SendTemplatedEmail),
            sendTextOnlyEmail: functions.createCaller(SendTextOnlyEmail),
        },
    };
}
