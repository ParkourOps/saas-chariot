import service from "@/libraries/service";
import isProductionEnv from "@/utilities/is-production-environment";
import mjml2html from "mjml";
import {MJMLParseResults} from "mjml-core";
import htmlMinifier from "html-minifier";

const mjmlToHtmlService = service.instantiate(
    "MjmlToHtml",
    "A service for translating Mail Jet Markup Language (MJML) to Hyper Text Markup Language (HTML).",
    ()=>mjml2html,
);

export const translateMjmlToHtml = mjmlToHtmlService.instantiateServiceFunction(
    async (provider, correlationId, mjml: string)=>{
        let parseResult : MJMLParseResults;
        try {
            parseResult = provider()(mjml);
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    "Could not translate Mail Jet Markup Language (MJML) to Hyper Text Markup Language (HTML)",
                    {
                        service: {
                            name: "MjmlToHtml",
                            description: "A service for translating Mail Jet Markup Language (MJML) to Hyper Text Markup Language (HTML).",
                        },
                        inputVariables: {
                            mjml,
                        },
                    }
                ),
            };
        }
        if (parseResult.errors.length > 0) {
            return {
                success: false,
                error: service.ServiceFunctionError.create(
                    correlationId,
                    "invalid-argument",
                    "Could not translate Mail Jet Markup Language (MJML) to Hyper Text Markup Language (HTML)",
                    {
                        service: {
                            name: "MjmlToHtml",
                            // eslint-disable-next-line max-len
                            description: "A service for translating Mail Jet Markup Language (MJML) to Hyper Text Markup Language (HTML).",
                        },
                        inputVariables: {
                            mjml,
                        },
                        intermediateVariables: {
                            parseResult,
                        },
                    }
                ),
            };
        } else {
            let html = parseResult.html;
            if (isProductionEnv()) {
                html = htmlMinifier.minify(html, {
                    collapseWhitespace: true,
                    minifyCSS: false,
                    caseSensitive: true,
                    removeEmptyAttributes: true,
                });
            }
            return {
                success: true,
                data: html,
            };
        }
    });
