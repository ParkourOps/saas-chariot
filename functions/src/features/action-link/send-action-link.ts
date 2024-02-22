import ActionLinkRecord from "@/_shared_/models/features/action-link/ActionLinkRecord";
import SendActionLink from "@/_shared_/models/features/action-link/api/SendActionLink";
import {createSecretKey} from "@/services/aes-256";
import DateTime from "@/_shared_/libraries/date-time";
import {sendTemplatedEmail} from "@/services/sendgrid";
import appConfig from "@/_shared_/data/application-config";
import withSchema from "@/_shared_/libraries/with-schema";
import hash from "@/_shared_/libraries/hash";
import getFunctionUrl from "@/utilities/get-function-url";
import internalApiCall from "@/libraries/internal-api-call";
import firestore from "@/libraries/firestore";
import uniqueId from "@/_shared_/libraries/unique-id";

export default internalApiCall.implement(SendActionLink)(async (request) => {
    const email = request.data.email;

    // 1. Generate an ID for the request.
    const actionLinkId = uniqueId.create();

    // 2. Generate secret key, this will make it sufficiently hard to reproduce the token hash.
    const secretKeyResult = await createSecretKey(request.correlationId);
    if (!secretKeyResult.success) {
        throw secretKeyResult.error;
    }
    const secretKey = secretKeyResult.data;

    // 3. Create a record for the request so it can be handled by the endpoint.
    const actionLinkRecord = withSchema.declareConst(ActionLinkRecord, {
        id: actionLinkId,
        email,
        actionSequence: request.data.actionSequence,
        secretKey: secretKey,
        created: DateTime.utcNow().toJSON(),
        successUrl: request.data.successUrl,
        failUrl: request.data.failUrl,
        status: "pending",
    });
    const db = firestore.get();
    await db.doc(`action-link/${actionLinkRecord.id}`).set(actionLinkRecord);

    // 4. Produce the link.
    const url = new URL(getFunctionUrl("handleActionLink"));
    url.searchParams.append("id", actionLinkId);
    url.searchParams.append("token", hash.create(actionLinkRecord));

    // 5. Send the email.
    const sendTemplatedEmailResult = await sendTemplatedEmail(request.correlationId, {
        to: {
            email,
        },
        from: appConfig.application.email,
        subject: "Action Required",
        templateName: "default",
        templateSubstitutions: {
            title: "Action Required",
            heading: request.data.prompt.heading,
            paragraph: request.data.prompt.paragraph,
            ctaText: request.data.callToActionText,
            ctaLink: url.toString(),
            appName: appConfig.application.title,
        },
        text:
`Action Required
 ===============

** ${ request.data.prompt.heading } **

${ request.data.prompt.paragraph }

${ url }


Thank you for choosing ${appConfig.application.title}.
`,
    });
    if (!sendTemplatedEmailResult.success) {
        throw sendTemplatedEmailResult.error;
    }
    return {};
});
