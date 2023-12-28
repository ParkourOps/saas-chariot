import { z } from "zod";

export default z.record(z.string(), z.union([
    z.string(),
    z.number(),
    z.null()
]));
