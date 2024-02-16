import SendTextOnlyEmail from "@/_shared_/models/features/email-messaging/api/SendTextOnlyEmail";
import {sendEmail} from "@/services/sendgrid";
import internalApiCall from "@/libraries/internal-api-call";

export default internalApiCall.implement(SendTextOnlyEmail)(async (request)=>{
    await sendEmail(request.correlationId, request.data);
    return {};
});
