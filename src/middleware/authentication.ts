import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "../config/firebase-config"
import { RequestHandler } from "express"
import { Request, Response, NextFunction } from "express"
import { AuthResponse } from "../types"

export const firebaseAuth: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, pwd } = req.headers
    const auth = getAuth(app)

    const isAuthenticated: AuthResponse = {
        isAuthenticated: false,
        accessToken: null
    }
    signInWithEmailAndPassword(auth, String(email), String(pwd))
        .then((userData) => {
            console.log("[authentication] Logged In")
            req.body = JSON.stringify(userData)
            next()
        })
        .catch((error) => {
            console.log("Error authentication module " + error)
            return res.json({ isAuthenticated })
        })
}
