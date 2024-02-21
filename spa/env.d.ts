/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Firebase
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_FIREBASE_APP_ID: string
    readonly VITE_FIREBASE_USE_EMULATOR: string
    readonly VITE_FIREBASE_MEASUREMENT_ID: string
    // Analytics
    readonly VITE_MIXPANEL_PROJECT_TOKEN: string
    readonly VITE_HOTJAR_SITE_ID: string
    readonly VITE_HOTJAR_VERSION: string
    // User Feedback
    readonly VITE_TAWK_PROPERTY_ID: string
    readonly VITE_TAWK_WIDGET_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
