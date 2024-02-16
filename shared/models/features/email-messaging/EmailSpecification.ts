import {z} from "zod";
import {NonEmptyString} from "../..";
import commonEmailSpecification from "./CommonEmailSpecification";

export default commonEmailSpecification.merge(z.object({
    text: NonEmptyString,
    html: NonEmptyString.nullish(),
}));
