import internalApiCall from "@/libraries/internal-api-call";
import SendSignInLink from "@/_shared_/models/features/user-authentication/api/SendSignInLink";
import {getAuth} from "firebase-admin/auth";
import ServerlessFunctionError from "@/libraries/serverless-function-error";
import {sendTemplatedEmail} from "@/services/sendgrid";
import appConfig from "@/_shared_/data/application-config";

export default internalApiCall.implement(SendSignInLink)(async (request)=>{
    const auth = getAuth();
    let signInUrl : string;
    try {
        signInUrl = await auth.generateSignInWithEmailLink(request.data.email, {
            url: request.data.redirectUrl,
            // handleCodeInApp: true,
        });
    } catch (e) {
        throw ServerlessFunctionError.createFromException(request.correlationId, e, "internal", "Could not get sign-in link.", {
            inputVariables: {
                email: request.data.email,
                redirectUrl: request.data.redirectUrl,
            },
        });
    }
    const sendTemplatedEmailResult = await sendTemplatedEmail(
        request.correlationId,
        {
            to: {
                email: request.data.email,
            },
            from: appConfig.application.email,
            subject: "Sign In to Your Account",
            templateName: "default",
            templateSubstitutions: {
                title: "Sign In to Your Account",
                paragraph: `Click the button below to sign in to your ${appConfig.application.title} account:`,
                ctaText: "Sign In",
                ctaLink: signInUrl,
                appName: appConfig.application.title,
            },
            text:
`Sign-In Link
=============

Please sign in using the link below:

${ signInUrl }


Thank you for choosing ${appConfig.application.title}.
`,
        }
    );
    if (!sendTemplatedEmailResult.success) {
        throw sendTemplatedEmailResult.error;
    }
    return {};
});
