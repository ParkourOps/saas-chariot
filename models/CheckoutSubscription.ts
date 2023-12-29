import { z } from "zod";
import NonEmptyString from "./NonEmptyString";
import Metadata from "./Metadata";
import URL from "./URL";

export default z.object({
    priceId: NonEmptyString,                    // indicates the product to be purchased, and at what price
    trialPeriodId: NonEmptyString.nullish(),    // applies a trial period to the subscription if given
    successUrl: URL,
    metadata: Metadata,
});
