import GetResourceInfo from "@/_shared_/models/features/resource-delivery/api/GetResourceInfo";
import internalApiCall from "@/libraries/internal-api-call";
import deliverableResources from "./data/deliverable-resources";
import ServerlessFunctionError from "@/libraries/serverless-function-error";

export default internalApiCall.implement(GetResourceInfo)(async (request)=>{
    const exists = Object.keys(deliverableResources).find((key)=>key === request.data.resourceKey);
    if (!exists) {
        throw ServerlessFunctionError.create(
            request.correlationId,
            "not-found",
            "Could not get resource information. Requested resource does not exist.",
            {
                inputVariables: {
                    resourceKey: request.data.resourceKey,
                },
            }
        );
    } else {
        const resourceEntry = deliverableResources[request.data.resourceKey];
        return {
            title: resourceEntry.title,
            description: resourceEntry.description,
        };
    }
});
