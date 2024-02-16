import service from "@/libraries/service";
import admin from "firebase-admin";
import DateTime from "@/_shared_/libraries/date-time";
import ServiceFunctionError from "@/libraries/service/service-function-error";

const resourceDelivery = service.instantiate(
    "Resource Delivery",
    "A service for delivering resources from cloud storage.",
    ()=>admin.storage().bucket()
);

export const getDownloadLink = resourceDelivery.instantiateServiceFunction(async (
    provider,
    correlationId,
    path: string,
    activeForMins: number,
)=>{
    const storagePath = `deliverable-resources/${path}`;
    try {
        const url = (await provider().file(storagePath).getSignedUrl({
            action: "read",
            expires: DateTime.utcNow().add(activeForMins, "minutes").toDate(),
        }))[0];
        return {
            success: true,
            data: url,
        };
    } catch (e) {
        return {
            success: false,
            error: ServiceFunctionError.createFromException(
                correlationId,
                e,
                "internal",
                "Could not get download link for resource.",
                {
                    service: {
                        name: "Resource Delivery",
                        description: "A service for delivering resources from cloud storage.",
                    },
                    inputVariables: {
                        path,
                    },
                }
            ),
        };
    }
});
