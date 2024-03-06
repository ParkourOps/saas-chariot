type TrackableEventProperties = {
    [key: string]: unknown
}

export type TrackableEventsDictionary = {
    [eventName: string]: (...args: any[]) => TrackableEventProperties
}
