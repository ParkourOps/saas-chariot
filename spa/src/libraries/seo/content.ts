import { Iso8601Timestamp, NonEmptyString } from "@/_shared_/models";
import { useSeoMeta } from "@unhead/vue";
import z from "zod";

export const BaseContent = z.object({
    title: NonEmptyString.max(70),
    description: NonEmptyString.max(200),
    authors: NonEmptyString.array().nullish(),
});

export const ContentWebsite = z.object({
    type: z.literal("website"),
}).merge(BaseContent);

export const ContentArticle = z.object({
    type: z.literal("article"),
    section: NonEmptyString.nullish(),
    tags: NonEmptyString.array().nullish(),
    datePublished: Iso8601Timestamp.nullish(),
    dateModified: Iso8601Timestamp.nullish(),
    dateExpires: Iso8601Timestamp.nullish(),
}).merge(BaseContent);

export const ContentBook = z.object({
    type: z.literal("book"),
    isbn: NonEmptyString.nullish(),
    tags: NonEmptyString.array().nullish(),
    dateReleased: Iso8601Timestamp.nullish(),
}).merge(BaseContent);

export const ContentProfile = z.object({
    type: z.literal("profile"),
    firstName: NonEmptyString.nullish(),
    lastName: NonEmptyString.nullish(),
    username: NonEmptyString.nullish(),
    gender: z.union([
        z.literal("male"),
        z.literal("female"),
    ]).nullish(),
}).merge(BaseContent);

export const Content = z.discriminatedUnion(
    "type", [
        ContentWebsite,
        ContentArticle,
        ContentBook,
        ContentProfile
    ]
);

type Content = z.infer<typeof Content>;
// TODO: Implement content types for:
//  music.song
//  music.album
//  music.playlist
//  music.radio_station
//  video.movie
//  video.episode
//  video.tv_show
//  video.other

export function content(entry: Content) {
    useSeoMeta({
        ogType: entry.type,
        // title
        title: entry.title,
        ogTitle: entry.title,
        twitterTitle: entry.title,
        // description
        description: entry.description,
        ogDescription: entry.description,
        twitterDescription: entry.description,
        // author
        author: entry.authors?.join(", "),
    });
    // article
    if (entry.type === "article") {
        useSeoMeta({
            articleAuthor: entry.authors,
            articleSection: entry.section,
            articleTag: entry.tags,
            articlePublishedTime: entry.datePublished,
            articleModifiedTime: entry.dateModified,
            articleExpirationTime: entry.dateExpires,
        });
    }
    // book
    if (entry.type === "book") {
        useSeoMeta({
            bookAuthor: entry.authors,
            bookIsbn: entry.isbn,
            bookTag: entry.tags,
            bookReleaseDate: entry.dateReleased,
        })
    }
    // profile
    if (entry.type === "profile") {
        useSeoMeta({
            profileFirstName: entry.firstName,
            profileLastName: entry.lastName,
            profileUsername: entry.username,
            profileGender: entry.gender,
        })
    }
}
