export type AuthResponse = {
    isAuthenticated: boolean
    accessToken: string | null
}

export type FirebaseOptions = {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
}

export type DiagramSchema = {
    name: string
    body: object
}
