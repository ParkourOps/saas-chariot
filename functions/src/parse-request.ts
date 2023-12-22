import {HttpsError} from "firebase-functions/v1/auth";
import {ZodType, ZodTypeDef} from "zod";

/**
   * Description placeholder
   *
   * @template [Output=any]
   * @template {ZodTypeDef} [Def=ZodTypeDef]
   * @template [Input=Output]
   * @param {string} schemaName
   * @param {ZodType<Output, Def, Input>} schema
   * @param {*} data
   * @return {*}
   */
export default function <
    Output,
    Def extends ZodTypeDef = ZodTypeDef,
    Input = Output
  >(
  schemaName: string,
  schema: ZodType<Output, Def, Input>,
  data: unknown
) {
  const parseResult = schema.safeParse(data);
  if (!parseResult.success) {
    throw new HttpsError("invalid-argument", `Invalid ${schemaName}.`, {
      details: parseResult.error.errors,
    });
  }
  return parseResult.data;
}
