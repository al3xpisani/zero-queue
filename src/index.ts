import express from "express"
import setRoutePaths from "./routes"
import "dotenv/config"
import cors from 'cors'
import { setRedisClient } from './redis/setRedisClient'

const app = express()
const port = process.env.EXPRESS_PORT
app.use(cors())
app.use(setRedisClient(app))
setRoutePaths(app)

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

export default app