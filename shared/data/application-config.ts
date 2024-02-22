import withSchema from "../libraries/with-schema";
import ApplicationConfig from "../models/ApplicationConfiguration";

export default withSchema.declareConst(ApplicationConfig, {
    application: {
        title: "SaaS Chariot",
        subtitle: "Rapidly Build and Launch Digital Products and Services",
        description: "Rapidly Build and Launch Digital Products and Services...",
        email: {
            displayName: "SaaS Chariot",
            email: "no_reply@saaschariot.com",
        },
        themeColour: "#153243",
        preferredColourScheme: "light",
        featuredImage: {
            url: "https://firebasestorage.googleapis.com/v0/b/saas-chariot.appspot.com/o/seo-assets%2Fimages%2Flogo.png?alt=media&token=f78bc5f0-fe27-47e9-b12b-0735033c609d",
            alt: "The SaaS Chariot logo.",
        },
    },
    contact: {
        company: {
            name: "Parkour Ops Ltd.",
            number: "14772189",
        },
        address: {
            lines: ["20-22 Wenlock Road", "London", "N1 7GU", "England", "United Kingdom"],
            geolocation: {
                latitude: 51.53065,
                longitude: -0.0936138,
            },
        },
        // officeHours: {
        //     monday: {
        //         from: {
        //             hours: 9,
        //             minutes: 0
        //         },
        //         to: {
        //             hours: 18,
        //             minutes: 0,
        //         }
        //     },
        //     tuesday: {
        //         from: {
        //             hours: 9,
        //             minutes: 0
        //         },
        //         to: {
        //             hours: 18,
        //             minutes: 0,
        //         }
        //     },
        //     wednesday: {
        //         from: {
        //             hours: 9,
        //             minutes: 0
        //         },
        //         to: {
        //             hours: 18,
        //             minutes: 0,
        //         }
        //     },
        //     thursday: {
        //         from: {
        //             hours: 9,
        //             minutes: 0
        //         },
        //         to: {
        //             hours: 18,
        //             minutes: 0,
        //         }
        //     },
        //     friday: {
        //         from: {
        //             hours: 9,
        //             minutes: 0
        //         },
        //         to: {
        //             hours: 18,
        //             minutes: 0,
        //         }
        //     },
        // },
        email: {
            displayName: "SaaS Chariot: Front Desk",
            email: "front_desk@saaschariot.com",
        },
        // phone: "+44 000 000 0000",
        timeZone: "Europe/London",
    },
    // social: {
    //     gitHub: "x",
    //     linkedIn: "x",
    //     facebook: "x",
    //     instagram: "x",
    //     youTube: "x",
    //     tikTok: "x",
    //     telegram: "x",
    //     x: "x",
    //     pinterest: "x",
    //     reddit: "x",
    //     discord: "x",
    // }
});
