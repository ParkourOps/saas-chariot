import withSchema from "../libraries/with-schema";
import ApplicationConfig from "../models/ApplicationConfiguration";

export default withSchema.declareConst(ApplicationConfig, {
    application: {
        name: 'SaaS Chariot',
        slogan: 'Rapidly Build and Launch Digital Products and Services',
        email: {
          displayName: 'SaaS Chariot',
          address: 'no_reply@saaschariot.com'
        }
      },
      contact: {
        company: {
          name: 'Parkour Ops Ltd.',
          number: '14772189'
        },
        address: {
          lines: ['20-22 Wenlock Road', 'London', 'N1 7GU', 'England', 'United Kingdom'],
          geolocation: {
            latitude: 51.53065,
            longitude: -0.0936138
          }
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
          displayName: 'SaaS Chariot: Front Desk',
          address: 'front_desk@saaschariot.com'
        },
        // phone: "+44 000 000 0000",
        timeZone: 'Europe/London'
      }
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
