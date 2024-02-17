import {z} from "zod";
import {NonEmptyString, Wgs84DecimalCoordinate, Url, Time, Boolean, ExpandedEmailAddress, TimeZone} from "./";

const DayOfficeHours = z.object({
    from: Time.omit({timeZone: true}),
    to: Time.omit({timeZone: true}),
});

const ApplicationDetails = z.object({
    title: NonEmptyString,
    subtitle: NonEmptyString.nullish(),
    allowInstall: Boolean.nullish(),
    email: ExpandedEmailAddress,
});

const ContactDetails = z.object({
    company: z.object({
        name: NonEmptyString.nullish(),
        number: NonEmptyString.nullish(),
    }).nullish(),

    address: z.object({
        lines: NonEmptyString.array(),
        geolocation: Wgs84DecimalCoordinate.nullish(),
    }).nullish(),

    timeZone: TimeZone,

    phone: NonEmptyString.nullish(),
    email: ExpandedEmailAddress,

    officeHours: z.object({
        monday: DayOfficeHours.nullish(),
        tuesday: DayOfficeHours.nullish(),
        wednesday: DayOfficeHours.nullish(),
        thursday: DayOfficeHours.nullish(),
        friday: DayOfficeHours.nullish(),
        saturday: DayOfficeHours.nullish(),
        sunday: DayOfficeHours.nullish(),
    }).nullish(),
});

const SocialMediaPresence = z.object({
    gitHub: Url.nullish(),
    linkedIn: Url.nullish(),
    facebook: Url.nullish(),
    instagram: Url.nullish(),
    youTube: Url.nullish(),
    tikTok: Url.nullish(),
    telegram: Url.nullish(),
    x: Url.nullish(),
    pinterest: Url.nullish(),
    reddit: Url.nullish(),
    discord: Url.nullish(),
});

export default z.object({
    application: ApplicationDetails,
    contact: ContactDetails,
    social: SocialMediaPresence.nullish(),
});
