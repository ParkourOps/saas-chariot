import type { ZodAny } from "zod";

export default function(schema: ZodAny, input?: any) {
    const parseResult = schema.safeParse(input);
    return parseResult.success;
}