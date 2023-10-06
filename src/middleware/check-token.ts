import { getAuth } from "firebase/auth"
import { app } from "../config/firebase-config"
import { RequestHandler } from "express"
import { Request, Response, NextFunction } from "express"
import { appAdmin } from "../config/firebase-config"
import { AuthResponse } from "../types"

export const checkValidToken: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isAuthenticated: AuthResponse = {
        isAuthenticated: false,
        accessToken: "Invalid token provided by client"
    }
    const token = req.header("Authorization").replace("Bearer", "").trim()
    const auth = getAuth(app)
    const clientProvidedToken = auth.currentUser

    res.header({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 200
    })
    appAdmin
        .auth()
        .verifyIdToken(String(token))
        .then((googleDecodedToken) => {
            if (googleDecodedToken.uid === clientProvidedToken.uid) {
                next()
            } else {
                return res.json({ isAuthenticated })
            }
        })
        .catch((error) => {
            console.error("invalid token provided by client " + error)
            return res.json({ isAuthenticated })
        })
}
