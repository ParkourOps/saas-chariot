import {ZodType, z, type ZodTypeDef} from "zod";

export default <
    Output,
    Def extends ZodTypeDef,
    Input
>(schema: ZodType<Output, Def, Input>) => ({

    instantiateConst(input: z.infer<ZodType<Output, Def, Input>>) {
        return Object.freeze(schema.parse(input));
    },

    instantiateVar(input?: z.infer<ZodType<Output, Def>>) {
        if (input) {
            return schema.parse(input);
        } else {
            return undefined;
        }
    },

    validate(input?: unknown) {
        const parseResult = schema.safeParse(input);
        return parseResult.success;
    },

});

