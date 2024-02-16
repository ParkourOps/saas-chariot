import ServerlessFunctionError, {ServerlessFunctionErrorCode, ServerlessFunctionErrorDetails} from "../serverless-function-error";

type ServiceFunctionErrorCode = ServerlessFunctionErrorCode;

type ServiceFunctionErrorDetails<
    ServiceName extends string,
    ServiceDescription extends string
> = ServerlessFunctionErrorDetails & {
    service: {
        name: ServiceName,
        description: ServiceDescription
    }
}

export default class ServiceFunctionError<
    ServiceName extends string,
    ServiceDescription extends string
> extends ServerlessFunctionError {
    private constructor(
        correlationId: string,
        code: ServiceFunctionErrorCode,
        message: string,
        details?: ServiceFunctionErrorDetails<ServiceName, ServiceDescription>
    ) {
        super(correlationId, code, message, details);
    }
    public static override create<
        ServiceName extends string,
        ServiceDescription extends string
    >(
        correlationId: string,
        code: ServiceFunctionErrorCode,
        message: string,
        details?: ServiceFunctionErrorDetails<ServiceName, ServiceDescription>
    ) {
        return new ServiceFunctionError(correlationId, code, message, details);
    }
    public static override createFromException<
        ServiceName extends string,
        ServiceDescription extends string
    >(
        correlationId: string,
        e: unknown,
        code: ServiceFunctionErrorCode,
        prependMessage: string | undefined,
        details: ServiceFunctionErrorDetails<ServiceName, ServiceDescription>
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
