import emailer from "@sendgrid/mail";
import EmailMessage from "../../../models/EmailMessage";
import {z} from "zod";
import {HttpsError} from "firebase-functions/v1/auth";

/**
 * Description placeholder
 *
 * @async
 * @param {EmailMessage} message
 * @return {void}
 */
export default async function(message: z.infer<typeof EmailMessage>) {
  // ensure API key is set
  const apiKey = process.env.VITE_SENDGRID_API_KEY;
  if (!apiKey) {
    throw new HttpsError("internal", "Internal server error.");
  }
  emailer.setApiKey(apiKey);
  //
  try {
    if (typeof message.to === "string") {
      await emailer.send({
        to: message.to,
        cc: message.cc ?? undefined,
        bcc: message.cc ?? undefined,

        from: message.from,
        replyTo: message.from ?? undefined,

        subject: message.subject,
        sendAt: message.sendAt ?
          new Date(message.sendAt).getTime() / 1000 : undefined,

        text: message.text,
        html: message.html ?? undefined,

        categories: message.categories ?? undefined,
      });
    } else {
      await emailer.sendMultiple({
        to: message.to,
        cc: message.cc ?? undefined,
        bcc: message.cc ?? undefined,

        from: message.from,
        replyTo: message.from ?? undefined,

        subject: message.subject,
        sendAt: message.sendAt ?
          new Date(message.sendAt).getTime() / 1000 : undefined,

        text: message.text,
        html: message.html ?? undefined,

        categories: message.categories ?? undefined,
      });
    }
  } catch (e) {
    throw new HttpsError("internal", "Failed to send email message.", {
      details: e,
    });
  }
}
