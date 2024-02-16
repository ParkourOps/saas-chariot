import {HttpsError, FunctionsErrorCode} from "firebase-functions/v2/https";
import {error} from "firebase-functions/logger";
import isProductionEnv from "@/utilities/is-production-environment";
import express from "express";

export type ServerlessFunctionErrorCode = FunctionsErrorCode;

export type ServerlessFunctionErrorDetails = {
    inputVariables?: Record<string, unknown>;
    intermediateVariables?: Record<string, unknown>;
};

export default class ServerlessFunctionError {
    readonly correlationId: string | undefined;
    readonly code: ServerlessFunctionErrorCode;
    readonly message: string;
    readonly details: ServerlessFunctionErrorDetails;
    protected constructor(
        correlationId: string | undefined,
        code: ServerlessFunctionErrorCode,
        message: string,
        details?: ServerlessFunctionErrorDetails
    ) {
        this.correlationId = correlationId;
        this.code = code;
        this.message = message;
        this.details = details ?? {};
    }
    toHttpsError() : HttpsError {
        return new HttpsError(
            this.code,
            isProductionEnv() ?
                `[${this.correlationId}, ${this.code}] An error occurred. See log for details.` :
                `[${this.correlationId}, ${this.code}] ${this.message}`,
            isProductionEnv() ?
                undefined :
                {
                    correlationId: this.correlationId,
                    ...this.details,
                }
        );
    }
    log() {
        error(
            `[${this.correlationId}, ${this.code}] ${this.message}`,
            {
                correlationId: this.correlationId,
                code: this.code,
                message: this.message,
                details: this.details,
            }
        );
    }
    send(response: express.Response) {
        const httpsError = this.toHttpsError();
        response
            .status(httpsError.httpErrorCode.status)
            .send(httpsError.toJSON())
        ;
    }
    public static extractErrorMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message;
        } else if (typeof error === "string") {
            return error;
        } else {
            return "<Unknown>";
        }
    }
    public static create(
        correlationId: string | undefined,
        code: FunctionsErrorCode,
        message: string,
        details?: ServerlessFunctionErrorDetails
    ) {
        return new ServerlessFunctionError(correlationId, code, message, details);
    }
    public static createFromException(
        correlationId: string | undefined,
        e: unknown,
        code: ServerlessFunctionErrorCode,
        prependMessage?: string,
        details?: ServerlessFunctionErrorDetails
    ) {
        return this.create(
            correlationId,
            code,
            prependMessage ? `${prependMessage}: ${this.extractErrorMessage(e)}` : this.extractErrorMessage(e),
            {
                ...details,
            }
        );
    }
}
