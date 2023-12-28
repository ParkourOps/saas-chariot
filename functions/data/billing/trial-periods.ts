import {z} from "zod";
import TrialPeriod from "../../../models/billing/TrialPeriod";

const trialPeriods : Record<string, z.infer<typeof TrialPeriod>> = {
    "5ZaLlzncvL": {
        durationInDays: 7
    },
    "yEczR3APTV": {
        durationInDays: 14
    },
    "i8UNBLou25": {
        durationInDays: 30
    }
} as const;

export default trialPeriods;
