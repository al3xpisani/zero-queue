import { Express } from "express-serve-static-core"
import routerHouse from "./house/houses"
import routerToken from "./token/token"

const setRoutePaths = (app: Express) => {
    app.get("/", (req, res) => {
        res.send("Check README.md file to be aware of API Contract")
    })

    app.use("/api/token", routerToken)
    app.use("/api/houses", routerHouse)
}
export default setRoutePaths
