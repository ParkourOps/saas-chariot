import {HttpsError} from "firebase-functions/v1/auth";
import * as fs from "fs-extra";
import compileHandlebarsTemplate from "./compile-handlebars-template";
import mjml from "mjml";

/**
   * Description placeholder
   *
   * @async
   * @param {string} templateName
   * @param {Record<string, unknown>} templateSubstitution
   * @return {unknown}
   */
export default async function(
  templateName: string,
  templateSubstitution: Record<string, unknown>
) {
  const templatePath = `data/email-templates/${templateName}.mjml`;
  const exists = await fs.pathExists(templatePath);
  if (!exists) {
    throw new HttpsError(
      "invalid-argument",
      "Template does not exist."
    );
  }
  return fs.readFile(templatePath, "utf-8")
    .catch((e)=>{
      throw new HttpsError("invalid-argument", "Could not load MJML template: " + templateName, e);
    })
    .then((template)=>{
      return compileHandlebarsTemplate(template, templateSubstitution);
    })
    .catch((e)=>{
      throw new HttpsError("invalid-argument", "Could not substitute MJML template: " + templateName, e);
    })
    .then((substitutedTemplate)=>{
      const mjmlParseResult = mjml(substitutedTemplate, {minify: true});
      if (mjmlParseResult.errors && mjmlParseResult.errors.length > 0) {
        throw mjmlParseResult.errors;
      }
      return mjmlParseResult.html;
    })
    .catch((e)=>{
      throw new HttpsError("invalid-argument", "Could not parse MJML template: " + templateName, e);
    })
    .then((html)=>{
      return html;
    });
}
