import service from "@/libraries/service";
import serverlessConfig from "@/serverless-config";
import crypto from "crypto";

const initialisationVector = serverlessConfig.services.aes256.initialisationVector;

const aes256 = service.instantiate(
    "AES 256",
    "A service for 256-bit symmetric encryption.",
    ()=>crypto,
);

export const createSecretKey = aes256.instantiateServiceFunction(async (provider, correlationId)=>{
    try {
        return {
            success: true,
            data: crypto.randomBytes(32).toString("hex"),
        };
    } catch (e) {
        return {
            success: false,
            error: service.ServiceFunctionError.createFromException(
                correlationId,
                e,
                "internal",
                "Could not generate secret key for encryption.",
                {
                    service: {
                        name: "AES 256",
                        description: "A service for 256-bit symmetric encryption.",
                    },
                }
            ),
        };
    }
});

export const encrypt = aes256.instantiateServiceFunction(async (
    provider,
    correlationId,
    secretKey: string,
    input: string
)=>{
    try {
        const cypher = crypto.createCipheriv("aes-256-ccm", secretKey, initialisationVector);
        let encrypted = cypher.update(input, "utf8", "hex");
        encrypted += cypher.final();
        return {
            success: true,
            data: encrypted,
        };
    } catch (e) {
        return {
            success: false,
            error: service.ServiceFunctionError.createFromException(
                correlationId,
                e,
                "internal",
                "Could not encrypt data.",
                {
                    service: {
                        name: "AES 256",
                        description: "A service for 256-bit symmetric encryption.",
                    },
                    inputVariables: {
                        initialisationVector,
                        secretKey,
                        input,
                    },
                }
            ),
        };
    }
});

export const decrypt = aes256.instantiateServiceFunction(async (
    provider,
    correlationId,
    secretKey: string,
    input: string
)=>{
    try {
        const decypher = crypto.createDecipheriv("aes-256-ccm", secretKey, initialisationVector);
        let decrypted = decypher.update(input, "hex", "utf8");
        decrypted += decypher.final("utf8");
        return {
            success: true,
            data: decrypted,
        };
    } catch (e) {
        return {
            success: false,
            error: service.ServiceFunctionError.createFromException(
                correlationId,
                e,
                "internal",
                "Could not decrypt data.",
                {
                    service: {
                        name: "AES 256",
                        description: "A service for 256-bit symmetric encryption.",
                    },
                    inputVariables: {
                        initialisationVector,
                        secretKey,
                        input,
                    },
                }
            ),
        };
    }
});
