import type {TrackableEventsDictionary} from "../types/trackable-events";

const trackableEvents = {
    ["join-mailing-list"] : (properties: {
        mailingListKey: string,
        leadMagnet?: {
            key: string,
            title: string,
            thumbnailUrl?: string
        }
    }) => (properties),
} satisfies TrackableEventsDictionary;

export type TrackableEvents = typeof trackableEvents;
export type TrackableEventName = keyof TrackableEvents;
export type TrackableEventArgs<TName extends TrackableEventName> = Parameters<TrackableEvents[TName]>;
export type TrackableEventProps<TName extends TrackableEventName> = ReturnType<TrackableEvents[TName]>;

export default trackableEvents;
