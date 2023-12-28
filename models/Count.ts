import { z } from "zod";

export default z.number().int().gte(0);
