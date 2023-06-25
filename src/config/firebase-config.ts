import { initializeApp, getApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { ref } from "firebase/database"
import { firebaseConfig } from "./google-firebase-keys-dev"
import { FirebaseOptions } from "../types"
import admin from "firebase-admin"

const app = initFirebaseApp(firebaseConfig)
const appAdmin = initFirebaseAppAdmin(firebaseConfig)
const db = getFirestore(app)

export function initFirebaseAppAdmin(config: FirebaseOptions) {
    return admin.initializeApp(config)
}

export function initFirebaseApp(config: FirebaseOptions) {
    try {
        return getApp()
    } catch {
        return initializeApp(config)
    }
}

export { app, appAdmin, db, ref, collection, addDoc }
