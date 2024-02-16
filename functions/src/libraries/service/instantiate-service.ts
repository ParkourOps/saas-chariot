import ServiceFunctionError from "./service-function-error";

type ServiceFunctionReturn<
    ServiceName extends string,
    ServiceDescription extends string,
    ServiceFunctionReturnData
> = {
        success: false,
        error: ServiceFunctionError<ServiceName, ServiceDescription>
    } |
    {
        success: true,
        data: ServiceFunctionReturnData
    }
;

export type ServiceFunction<
    ServiceName extends string,
    ServiceDescription extends string,
    ServiceFoundation,
    ServiceFunctionArgs extends unknown[],
    ServiceFunctionReturnData
> = (
    provider: ()=>ServiceFoundation,
    correlationId: string,
    ...args: ServiceFunctionArgs
) => Promise<ServiceFunctionReturn<
    ServiceName,
    ServiceDescription,
    ServiceFunctionReturnData
>>;

export default function instantiateService<
    ServiceName extends string,
    ServiceDescription extends string,
    ServiceFoundation
>(
    name: ServiceName,
    description: ServiceDescription,
    provider: ()=>ServiceFoundation
) {
    return {
        name,
        description,
        get service() {
            return provider();
        },
        instantiateServiceFunction<
            ServiceFunctionArgs extends unknown[],
            ServiceFunctionReturnData
        >(
            fn: ServiceFunction<
                ServiceName,
                ServiceDescription,
                ServiceFoundation,
                ServiceFunctionArgs,
                ServiceFunctionReturnData
            >
        ) {
            return async function(
                correlationId: string,
                ...args: ServiceFunctionArgs
            ) : Promise<ServiceFunctionReturn<
                ServiceName,
                ServiceDescription,
                ServiceFunctionReturnData
            >> {
                try {
                    return await fn(provider, correlationId, ...args);
                } catch (e) {
                    if (e instanceof ServiceFunctionError) {
                        return {
                            success: false,
                            error: e,
                        };
                    }
                    const error = ServiceFunctionError.createFromException(
                        correlationId,
                        e,
                        "internal",
                        `An unknown error was caught in ${name} service.`,
                        {
                            service: {
                                name,
                                description,
                            },
                        }
                    );
                    return {
                        success: false,
                        error,
                    };
                }
            };
        },
    };
}
