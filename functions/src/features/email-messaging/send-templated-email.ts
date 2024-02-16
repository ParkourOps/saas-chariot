import SendTemplatedEmail from "@/_shared_/models/features/email-messaging/api/SendTemplatedEmail";
import {sendTemplatedEmail} from "@/services/sendgrid";
import internalApiCall from "@/libraries/internal-api-call";

export default internalApiCall.implement(SendTemplatedEmail)(async (request)=>{
    await sendTemplatedEmail(request.correlationId, request.data);
    return {};
});
