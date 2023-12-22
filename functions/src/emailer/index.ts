import {onCall} from "firebase-functions/v2/https";
import EmailMessage from "../../../models/EmailMessage";
import TemplatedEmailMessage from "../../../models/TemplatedEmailMessage";
import parseRequest from "../parse-request";
import transmitEmail from "./transmit-email";
import produceTemplatedHTMLMessage from "./produce-templated-html-message";

export const sendEmail = onCall(async (request)=>{
  const message = parseRequest("email message", EmailMessage, request.data);
  return await transmitEmail(message);
});

export const sendTemplatedEmail = onCall(async (request)=>{
  const message = parseRequest("templated email message", TemplatedEmailMessage, request.data);
  const htmlMessage = await produceTemplatedHTMLMessage(message.templateName, message.templateSubstitution);
  return await transmitEmail({
    to: message.to,
    cc: message.cc,
    bcc: message.bcc,

    from: message.from,
    replyTo: message.from,

    subject: message.subject,
    sendAt: message.sendAt,

    text: message.text,
    html: htmlMessage,

    categories: message.categories,
  });
});
