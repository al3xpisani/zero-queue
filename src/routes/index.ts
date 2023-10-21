import { Express } from 'express'
import routerTicket from './ticket/ticket'
import routerToken from './token/token'
const setRoutePaths = (app: Express) => {
    app.get('/', (req, res) => {
        res.send('Check README.md file to be aware of API Contract')
    })

    app.use('/api/token', routerToken)
    app.use('/api/ticket', routerTicket)
}
export default setRoutePaths
