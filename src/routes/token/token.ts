import express from "express"
import { firebaseAuth } from "../../middleware/authentication"
import { RequestHandler } from "express"
import { Request, Response, NextFunction } from "express"

const routerToken = express.Router()
const auth: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return firebaseAuth(req, res, next)
}
const readTokenFromMiddleware = (body: string) => {
    const {
        user: {
            stsTokenManager: { accessToken: token }
        }
    } = JSON.parse(body)
    return token
}

routerToken.get("/", auth, async (req: Request, res: Response) => {
    try {
        const token = readTokenFromMiddleware(req.body)
        return res
            .status(200)
            .json({ isAuthenticated: true, accessToken: token })
    } catch (e) {
        return res
            .status(400)
            .json({ isAuthenticated: false, accessToken: null })
    }
})

export default routerToken
