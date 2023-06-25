import express from "express"
import routerHouse from "./house/houses"
import routerToken from "./token/token"

const appJest = express()
appJest.use(express.json())
appJest.use("/api/token", routerToken)
appJest.use("/api/houses", routerHouse)

module.exports = appJest
