import { ZodObject, z } from "zod";

export type ApiCall<
A extends z.ZodRawShape,
B extends z.UnknownKeysParam,
C extends z.ZodTypeAny,
D,
E extends z.ZodRawShape,
F extends z.UnknownKeysParam,
G extends z.ZodTypeAny,
H
> = {
    name: string,
    description?: string,
    request: ZodObject<A,B,C,D,D>,
    successResponse: ZodObject<E,F,G,H,H>
};

export default function<
    A extends z.ZodRawShape,
    B extends z.UnknownKeysParam,
    C extends z.ZodTypeAny,
    D,
    E extends z.ZodRawShape,
    F extends z.UnknownKeysParam,
    G extends z.ZodTypeAny,
    H
>(args: ApiCall<A,B,C,D,E,F,G,H>) {
    return args;
};

