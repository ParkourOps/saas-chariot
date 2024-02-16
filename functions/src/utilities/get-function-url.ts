import internalApiCall from "@/_shared_/libraries/internal-api-call";
import isProductionEnvironment from "./is-production-environment";

export default function(fn?: string | ReturnType<typeof internalApiCall.declare>) {
    const projectName = process.env["GCLOUD_PROJECT"];
    const firebaseConfig = JSON.parse(process.env["FIREBASE_CONFIG"] ?? "{}");
    const functionRegion = firebaseConfig["locationId"] ?? "us-central1";
    const _functionName = fn ?
        (typeof fn === "string") ? fn : fn.name :
        process.env["FUNCTION_TARGET"];
    if (isProductionEnvironment()) {
        return `https://${functionRegion}-${projectName}.cloudfunctions.net/${_functionName}`;
    } else {
        return `http://localhost:5001/${projectName}/${functionRegion}/${_functionName}`;
    }
}
