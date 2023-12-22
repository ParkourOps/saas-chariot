/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Generic
    readonly VITE_APP_NAME: string,
    readonly VITE_APP_URL: string,
    // Firebase
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_FIREBASE_APP_ID: string
    readonly VITE_FIREBASE_USE_EMULATOR: string
    // Analytics
    readonly VITE_FIREBASE_MEASUREMENT_ID: string
    readonly VITE_MIXPANEL_PROJECT_TOKEN: string
    readonly VITE_HOTJAR_SITE_ID: string
    readonly VITE_HOTJAR_VERSION: string
    // User Feedback
    readonly VITE_TAWK_PROPERTY_ID: string
    readonly VITE_TAWK_WIDGET_ID: string
    // Billing
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
