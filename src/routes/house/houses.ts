import express from "express"
import { Request, Response, NextFunction } from "express"
import { RequestHandler } from "express"
import bodyParser from "body-parser"
import {
    addHouse,
    listHouses,
    findByHouseField,
    deleteRecordByField
} from "../../controllers/houseController"
import { checkValidToken } from "../../middleware/check-token"

const routerHouse = express.Router()
const midVerifyValidToken: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return checkValidToken(req, res, next)
}

routerHouse.post(
    "/",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            await addHouse(req.body)
            return res
                .status(200)
                .json({ status: "House - Registro adicionado." })
        } catch (e) {
            return res
                .status(400)
                .json({ status: "Erro ao adicionar registro " + e })
        }
    }
)

routerHouse.get(
    "/",
    midVerifyValidToken,
    async (req: Request, res: Response) => {
        try {
            const allHouses = await listHouses()
            return res
                .status(200)
                .json({ status: "House - Listagem ok.", data: allHouses })
        } catch (e) {
            return res
                .status(400)
                .json({ status: "Erro ao listar registro " + e })
        }
    }
)

routerHouse.get(
    "/name/:houseName",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { houseName } = req.params
            const respHouseName = await findByHouseField(houseName, "name")
            return res.status(200).json({
                status: "House - Listagem findByName ok.",
                data: respHouseName
            })
        } catch (e) {
            return res
                .status(400)
                .json({ status: "Erro ao listar findByName registro " + e })
        }
    }
)

routerHouse.get(
    "/id/:id",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const respHouseID = await findByHouseField(id, "id")
            return res.status(200).json({
                status: "House - Listagem findByID ok.",
                data: respHouseID
            })
        } catch (e) {
            return res
                .status(400)
                .json({ status: "Erro ao listar findByID registro " + e })
        }
    }
)

routerHouse.delete(
    "/:houseName",
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { houseName } = req.params
            const responseRemove = await deleteRecordByField(houseName, "name")
            return res.status(200).json(responseRemove)
        } catch (e) {
            return res
                .status(400)
                .json({ status: "Erro ao excluir registro " + e })
        }
    }
)

export default routerHouse
