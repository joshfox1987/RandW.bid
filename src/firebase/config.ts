import firebaseAppletConfig from '../../firebase-applet-config.json';

/**
 * Firebase project configuration.
 * Explicitly exported for use in the app and server actions.
 */
export const firebaseConfig = {
  projectId: firebaseAppletConfig.projectId || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: firebaseAppletConfig.appId || process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: firebaseAppletConfig.apiKey || process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: firebaseAppletConfig.authDomain || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: firebaseAppletConfig.storageBucket || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: firebaseAppletConfig.measurementId || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: firebaseAppletConfig.messagingSenderId || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  firestoreDatabaseId: firebaseAppletConfig.firestoreDatabaseId || '(default)',
} as const;
