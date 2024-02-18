import {z} from "zod";
import {NonEmptyString, Wgs84DecimalCoordinate, Time, ExpandedEmailAddress, TimeZone, Colour, Url, Boolean} from "./";

const DayOfficeHours = z.object({
    from: Time.omit({timeZone: true}),
    to: Time.omit({timeZone: true}),
});

const ApplicationDetails = z.object({
    title: NonEmptyString.max(70),
    subtitle: NonEmptyString.nullish(),
    description: NonEmptyString.max(200),
    featuredImage: z.object({
        url: Url,
        alt: NonEmptyString,
        enlargedPreview: Boolean.nullish(),
    }).nullish(),
    featuredVideo: z.object({
        url: Url,
        alt: NonEmptyString,
    }).nullish(),
    featuredAudio: z.object({
        url: Url,
    }).nullish(),
    themeColour: Colour,
    preferredColourScheme: z.union([
        z.literal("light"),
        z.literal("dark"),
    ]),
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
    // gitHub: Url.nullish(),
    // linkedIn: Url.nullish(),
    facebook: z.object({
        applicationId: NonEmptyString.nullish(),
    }).partial(),
    // instagram: Url.nullish(),
    // youTube: Url.nullish(),
    // tikTok: Url.nullish(),
    // telegram: Url.nullish(),
    google: z.object({
        siteVerification: NonEmptyString.nullish(),
    }).partial(),
    x: z.object({
        username: NonEmptyString.startsWith("@"),
    }).partial(),
    // pinterest: Url.nullish(),
    // reddit: Url.nullish(),
    // discord: Url.nullish(),
});

export default z.object({
    application: ApplicationDetails,
    contact: ContactDetails,
    social: SocialMediaPresence.nullish(),
});
