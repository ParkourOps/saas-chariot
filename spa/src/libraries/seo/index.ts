import {useSeoMeta} from "unhead";
import getAssetUrl from "@/utilities/get-asset-url";
import configs from "@/configs";
import getRouteUrl from "@/utilities/get-route-url";
import { content } from "./content";

type VideoImport = Promise<typeof import("*.mp4")> | typeof import("*.mp4");

type ImageImport = | 
    Promise<typeof import("*.jpeg")> | typeof import("*.jpeg")  |
    Promise<typeof import("*.jpg")> | typeof import("*.jpg")    |
    Promise<typeof import("*.gif")> | typeof import("*.gif")    |
    Promise<typeof import("*.png")> | typeof import("*.png")    ;

type AudioImport = |
    Promise<typeof import("*.mp3")> | typeof import("*.mp3")    |
    Promise<typeof import("*.ogg")> | typeof import("*.ogg")    |
    Promise<typeof import("*.wav")> | typeof import("*.wav")    ;

function allowIndex() {
    useSeoMeta({
        robots: "index, follow",
    })
}

function getFileExtensionFromUrl(url: string) {
    const _url = new URL(url);
    _url.hash = "";
    _url.search = "";
    const urlParts = _url.toString().split(".");
    const fileExtension = urlParts[urlParts.length - 1];
    return fileExtension;
}

async function video(src: VideoImport | string, alt: string) {
    let _src : string;
    if (typeof src !== "string") {
        if (src instanceof Promise) {
            src = await src;
        }
        _src = getAssetUrl(src.default);
    } else {
        _src = src;
    }
    if (getFileExtensionFromUrl(_src) !== ("mp4")) {
        console.error("Unsupported video format.", _src);
        return;
    }
    const video = document.createElement("video");
    video.addEventListener("loadedmetadata", function(){
        const width = this.videoWidth;
        const height = this.videoHeight;
        useSeoMeta({
            ogVideo: {
                url: _src,
                secureUrl: _src,
                type: "video/mp4",
                width,
                height,
                alt,
            },
        });
    });
    video.src = _src;
}

async function image(src: ImageImport | string, alt: string, enlargedPreview?: boolean) {
    let _src : string;
    if (typeof src !== "string") {
        if (src instanceof Promise) {
            src = await src;
        }
        _src = getAssetUrl(src.default);    
    } else {
        _src = src;
    }
    const fileExtension = getFileExtensionFromUrl(_src);
    let type : "image/jpeg" | "image/gif" | "image/png";
    if (["jpeg", "jpg"].includes(fileExtension)) {
        type = "image/jpeg"
    } else if (["gif"].includes(fileExtension)) {
        type = "image/gif";
    } else if (["png"].includes(fileExtension)) {
        type = "image/png";
    } else {
        console.error("Unsupported image format.", _src);
        return;
    }
    const image = document.createElement("img");
    image.addEventListener("load", function(){
        const width = this.naturalWidth;
        const height = this.naturalWidth;
        useSeoMeta({
            ogImage: {
                url: _src,
                secureUrl: _src,
                type,
                width,
                height,
                alt,
            },
            twitterImage: {
                url: _src,
                alt,
            },
            twitterCard: enlargedPreview ? "summary_large_image" : "summary",
        })
    })
    image.src = _src;
}

async function audio(src: AudioImport | string) {
    let _src : string;
    if (typeof src !== "string") {
        if (src instanceof Promise) {
            src = await src;
        }
        _src = getAssetUrl(src.default);
    } else {
        _src = src;
    }
    const fileExtension = getFileExtensionFromUrl(_src);
    let type : "audio/mpeg" | "audio/ogg" | "audio/wav";
    if (["mp3"].includes(fileExtension)) {
        type = "audio/mpeg";
    } else if (["ogg"].includes(fileExtension)) {
        type = "audio/ogg";
    } else if (["wav"].includes(fileExtension)) {
        type = "audio/wav";
    } else {
        console.error("Unsupported audio format.", _src);
        return;
    }
    useSeoMeta({
        ogAudio: {
            url: _src,
            secureUrl: _src,
            type: type,
        }
    })
}

// apply base SEO tags from app config
(()=>{
    useSeoMeta({
        applicationName: configs.application.title,
        title: undefined,
        titleTemplate: (title) => title ? `${title} - ${configs.application.title}` : configs.application.title,
        description: configs.application.description,
        themeColor: {
            content: configs.application.themeColour,
            media: configs.application.preferredColourScheme === "light" ?
                "(prefers-color-scheme: light)" : "(prefers-color-scheme: dark)",
        },
        colorScheme: configs.application.preferredColourScheme === "light" ? "only light" : "dark light",
        creator: configs.contact.company?.name ?? configs.application.title,
        googleSiteVerification: configs.social?.google.siteVerification,
        fbAppId: configs.social?.facebook.applicationId,
        twitterSite: configs.social?.x.username,
        // the open graph protocol
        ogUrl: getRouteUrl({name: "/"}),
        ogType: "website",
        ogSiteName: configs.application.title,
        ogTitle: configs.application.title,
        ogDescription: configs.application.description,
        // twitter protocol
        twitterCard: "summary",
        twitterTitle: configs.application.title,
        twitterDescription: configs.application.description,
        // don't index or follow until specified otherwise!
        robots: "noindex, nofollow",
    });
    if (configs.application.featuredImage) {
        image(
            configs.application.featuredImage.url,
            configs.application.featuredImage.alt,
            configs.application.featuredImage.enlargedPreview ?? false,
        );
    }
    if (configs.application.featuredVideo) {
        video(
            configs.application.featuredVideo.url,
            configs.application.featuredVideo.alt,
        );
    }
    if (configs.application.featuredAudio) {
        audio(
            configs.application.featuredAudio.url,
        );
    }
})();

export default {
    featureVideo: video,
    featureImage: image,
    featureAudio: audio,
    setContent: content,
    allowIndex,
}
