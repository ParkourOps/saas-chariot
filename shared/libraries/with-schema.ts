import {freeze} from "@parkour-ops/freeze-thaw";
import {ZodType, z, type ZodTypeDef} from "zod";

function declareConst<
    Output,
    Def extends ZodTypeDef,
    Input
>(
    schema: ZodType<Output, Def, Input>,
    input: z.infer<ZodType<Output, Def>>
) {
    return freeze(schema.parse(input));
}

function declareVar<
    Output,
    Def extends ZodTypeDef,
    Input
>(
    schema: ZodType<Output, Def, Input>,
    input?: z.infer<ZodType<Output, Def>> | undefined | null
) {
    if (input) {
        return schema.parse(input);
    } else {
        return undefined;
    }
}

function validate<
    Output,
    Def extends ZodTypeDef,
    Input
>(
    schema: ZodType<Output, Def, Input>,
    input?: unknown
) {
    const parseResult = schema.safeParse(input);
    return parseResult.success;
}

export default {
    declareConst,
    declareVar,
    validate,
};
