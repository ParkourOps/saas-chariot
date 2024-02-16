import {sha256} from 'js-sha256'

export const InvalidInputTypeError = Error("Could not hash item. Invalid input type.");

function create(input: string | number | bigint | boolean | object) {
  let item : string;
  if (typeof input === "string") {
    item = input;
  } else if (typeof input === "number" || typeof input === "bigint") {
    item = String(input);
  } else if (typeof input === "boolean") {
    item = String(input === true ? "true" : "false");
  } else if (typeof input === "object") {
    item = JSON.stringify(input);
  } else {
    throw InvalidInputTypeError;
  }
  return sha256.create().update(item).hex();
}

export default {
  create,
};
