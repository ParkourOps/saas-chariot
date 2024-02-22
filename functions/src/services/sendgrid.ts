import service from "@/libraries/service";
import serverlessConfig from "@/serverless-config";
import sendgrid from "@sendgrid/mail";
import {z} from "zod";
import EmailSpec from "@/_shared_/models/features/email-messaging/EmailSpecification";
import {ExpandedEmailAddress} from "@/_shared_/models";
import DateTime from "@/_shared_/libraries/date-time";
import {substitutePreinstalledTemplate} from "./handlebars-template";
import {translateMjmlToHtml} from "./mjml-to-html";
import TemplatedEmailSpecification from "@/_shared_/models/features/email-messaging/TemplatedEmailSpecification";

function parseEmailAddress(input: z.infer<typeof ExpandedEmailAddress>) {
    if (input.displayName) {
        return {
            name: input.displayName,
            email: input.email,
        };
    } else {
        return input.email;
    }
}

function parseEmailAddresses(input: z.infer<typeof ExpandedEmailAddress> | z.infer<typeof ExpandedEmailAddress>[]) {
    if (Array.isArray(input)) {
        return input.map((i)=>parseEmailAddress(i));
    } else {
        return parseEmailAddress(input);
    }
}

const sendgridService = service.instantiate(
    "SendGrid",
    "A third-party service for sending transactional emails.",
    function() {
        // ensure module is initialised with API key
        sendgrid.setApiKey(serverlessConfig.services.sendgrid.apiKey);
        // return the initialised module
        return sendgrid;
    }
);

export const sendEmail =
    sendgridService.
        instantiateServiceFunction(async (
            provider,
            correlationId,
            messageSpecification: z.infer<typeof EmailSpec>
        ) => {
            try {
                await provider().send({
                    to: parseEmailAddresses(messageSpecification.to),
                    cc: messageSpecification.cc ? parseEmailAddresses(messageSpecification.cc) : undefined,
                    bcc: messageSpecification.bcc ? parseEmailAddresses(messageSpecification.bcc) : undefined,

                    from: parseEmailAddress(messageSpecification.from),
                    replyTo: messageSpecification.replyTo ?
                        parseEmailAddress(messageSpecification.replyTo) : undefined,

                    subject: messageSpecification.subject,
                    sendAt: messageSpecification.sendAt ?
                        DateTime.fromJSON(messageSpecification.sendAt).toUNIX() : undefined,

                    text: messageSpecification.text,
                    html: messageSpecification.html ?? undefined,

                    categories: messageSpecification.categories ?? undefined,
                });
                return {
                    success: true,
                    data: undefined,
                };
            } catch (e) {
                return {
                    success: false,
                    error: service.ServiceFunctionError.createFromException(
                        correlationId,
                        e,
                        "internal",
                        "Could not send email message",
                        {
                            service: {
                                name: "SendGrid",
                                description: "A third-party service for sending transactional email messages.",
                            },
                            inputVariables: {
                                messageSpecification,
                            },
                        }
                    ),
                };
            }
        });

export const sendTemplatedEmail = sendgridService.instantiateServiceFunction(
    async (
        provider,
        correlationId,
        messageSpecification: z.infer<typeof TemplatedEmailSpecification>
    ) => {
        const substitutionResult = await substitutePreinstalledTemplate(
            correlationId,
            `data/static/email-templates/${messageSpecification.templateName}.mjml`,
            messageSpecification.templateSubstitutions
        );
        if (!substitutionResult.success) {
            throw substitutionResult.error;
        }
        const translationResult = await translateMjmlToHtml(
            correlationId,
            substitutionResult.data
        );
        if (!translationResult.success) {
            throw translationResult.error;
        }
        const sendEmailResult = await sendEmail(
            correlationId,
            {
                to: messageSpecification.to,
                cc: messageSpecification.cc,
                bcc: messageSpecification.bcc,

                from: messageSpecification.from,
                replyTo: messageSpecification.from,

                subject: messageSpecification.subject,
                sendAt: messageSpecification.sendAt,

                text: messageSpecification.text,
                html: translationResult.data,

                categories: messageSpecification.categories,
            }
        );
        if (!sendEmailResult.success) {
            throw sendEmailResult.error;
        }
        return {
            success: true,
            data: undefined,
        };
    }
);
