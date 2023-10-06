import express from "express"
import { Request, Response, NextFunction } from "express"
import { RequestHandler } from "express"
import bodyParser from "body-parser"
import {
    createDiagram,
    editDiagrams,
    listDiagrams,
    deleteDiagrams,
    listDiagramsById
} from "../../controllers/diagramController"
import { checkValidToken } from "../../middleware/check-token"
import httpStatus from "http-status"

const routerDiagram = express.Router()
const midVerifyValidToken: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return checkValidToken(req, res, next)
}

routerDiagram.post(
    "/",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const newCreatedDiagram = await createDiagram(req.body)
            return res.status(httpStatus.CREATED).json({
                status: "Diagram - Record created.",
                data: [newCreatedDiagram]
            })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: "Error when creating new diagram " + e })
        }
    }
)

routerDiagram.get(
    "/",
    midVerifyValidToken,
    async (req: Request, res: Response) => {
        try {
            const allDiagrams = await listDiagrams()
            return res
                .status(httpStatus.OK)
                .json({ status: "Diagram - Listing ok.", data: allDiagrams })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: "Error when listing diagram " + e })
        }
    }
)

routerDiagram.get(
    "/:diagramID",
    midVerifyValidToken,
    async (req: Request, res: Response) => {
        try {
            const { diagramID } = req.params
            const allDiagrams = await listDiagramsById("id", diagramID)
            return res.status(httpStatus.OK).json({
                status: "Diagram - Listing by ID ok.",
                data: allDiagrams
            })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: "Error when listing diagram " + e })
        }
    }
)

routerDiagram.delete(
    "/:diagramID",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { diagramID } = req.params
            const responseRemove = await deleteDiagrams("id", diagramID)
            return res.status(httpStatus.OK).json({
                status: "Diagram - Record deleted.",
                data: [responseRemove]
            })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: "Error when deleting diagram " + e })
        }
    }
)

routerDiagram.put(
    "/:diagramID",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { diagramID } = req.params
            const responseRemove = await editDiagrams("id", diagramID, req.body)
            return res.status(httpStatus.NO_CONTENT).json(responseRemove)
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: "Error when deleting diagram " + e })
        }
    }
)

export default routerDiagram
