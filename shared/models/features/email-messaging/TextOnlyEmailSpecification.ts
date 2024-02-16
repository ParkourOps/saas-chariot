import {z} from "zod";
import { NonEmptyString } from "../..";
import CommonEmailSpec from "./CommonEmailSpecification";

export default CommonEmailSpec.merge(z.object({
    text: NonEmptyString,
}));
