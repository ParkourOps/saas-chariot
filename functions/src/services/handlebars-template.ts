import service from "@/libraries/service";
import * as fs from "fs-extra";
import handlebars from "handlebars";

type Handlebars = typeof handlebars;

const handlebarsTemplateService = service.instantiate(
    "Handlebars Template",
    "A service for producing text content using semantic templates.",
    ()=>handlebars
);

function compileHandlebarsTemplate(
    handlebars: Handlebars,
    template: string,
    templateSubstitutions: Record<string, unknown>
) {
    // TODO: Fix helper functions:
    // handlebars.registerHelper({
    //     eq(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = (arg1 === arg2);
    //         console.log(args, result, options?.data);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     ne(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = (arg1 !== arg2);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     lt(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = (arg1 < arg2);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     gt(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = (arg1 > arg2);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     lte(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = (arg1 <= arg2);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     gte(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = (arg1 >= arg2);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     and(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = args.every((arg)=>!!arg);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    //     or(arg1, arg2, arg3, arg4, arg5, arg6, options) {
    //         const args = [arg1, arg2, arg3, arg4, arg5, arg6].filter((arg)=>(typeof arg === "string"));
    //         const result = args.some((arg)=>!!arg);
    //         console.log(args, result);
    //         return (result ? options?.fn(this) : options?.inverse(this));
    //     },
    // });
    const compiled = handlebars.compile(template)(templateSubstitutions);
    return compiled;
}

export const substitutePreinstalledTemplate = handlebarsTemplateService.instantiateServiceFunction(
    async (provider, correlationId, templatePath: string, templateSubstitutions: Record<string, unknown>)=>{
        // check if file exists
        const _templatePath = `${__dirname}/../${templatePath}`;
        const exists = await fs.pathExists(_templatePath);
        if (!exists) {
            return {
                success: false,
                error: service.ServiceFunctionError.create(
                    correlationId,
                    "invalid-argument",
                    `Template has not been installed: ${templatePath}`,
                    {
                        service: {
                            name: "Handlebars",
                            description: "A service for producing text content using semantic templates.",
                        },
                        inputVariables: {
                            templatePath,
                        },
                        intermediateVariables: {
                            _templatePath,
                        },
                    }
                ),
            };
        }
        // read template file
        let template : string;
        try {
            template = await fs.readFile(_templatePath, "utf-8");
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    `Could not read template: ${templatePath}`,
                    {
                        service: {
                            name: "Handlebars",
                            description: "A service for producing text content using semantic templates.",
                        },
                        inputVariables: {
                            templatePath,
                        },
                        intermediateVariables: {
                            _templatePath,
                        },
                    }
                ),
            };
        }
        // compile and substitute template
        let output : string;
        try {
            output = compileHandlebarsTemplate(provider(), template, templateSubstitutions);
            return {
                success: true,
                data: output,
            };
        } catch (e) {
            return {
                success: false,
                error: service.ServiceFunctionError.createFromException(
                    correlationId,
                    e,
                    "internal",
                    `Could not substitute template: ${templatePath}`,
                    {
                        service: {
                            name: "Handlebars",
                            description: "A service for producing text content using semantic templates.",
                        },
                        inputVariables: {
                            templatePath,
                            templateSubstitutions,
                        },
                        intermediateVariables: {
                            _templatePath,
                            template,
                        },
                    }
                ),
            };
        }
    }
);
