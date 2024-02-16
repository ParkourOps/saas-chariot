import {z} from "zod";
import {NonEmptyString} from "../../";
import CommonEmailSpec from "./CommonEmailSpecification";

export default CommonEmailSpec.merge(z.object({
    text: NonEmptyString,
    templateName: NonEmptyString,
    templateSubstitutions: z.record(z.string(), z.unknown()),
}));
