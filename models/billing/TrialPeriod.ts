import { z } from "zod";
import Count from "../Count";

export default z.object({
    durationInDays: Count
});
