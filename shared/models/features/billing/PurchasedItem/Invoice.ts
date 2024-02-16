import {z} from "zod";
import {NonEmptyString, DateTime, Url, Metadata} from "../../../";
import Charge from "./Charge";

export default z.object({
    id: NonEmptyString,
    webpageUrl: Url.nullish(),
    pdfUrl: Url.nullish(),
    created: DateTime,
    metadata: Metadata,
    // embedded charge
    charge: Charge,
});
