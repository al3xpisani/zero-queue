import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { RequestHandler } from 'express'
import bodyParser from 'body-parser'
import {
    createTicket,
    editTickets,
    listTickets,
    deleteTickets,
    listTicketsById
} from '../../controllers/ticketController'
import { checkValidToken } from '../../middleware/check-token'
import httpStatus from 'http-status'

const routerTicket = express.Router()
const midVerifyValidToken: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return checkValidToken(req, res, next)
}

routerTicket.post(
    '/',
    // midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const newCreatedTicket = await createTicket(
                req.body,
                req.redisClient
            )
            const { error } = newCreatedTicket || {}
            if (error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: `Operation cancelled.`,
                    data: [newCreatedTicket]
                })
            }
            return res.status(httpStatus.CREATED).json({
                status: `Ticket created and dispatched to area ${req.body.serviceTypeArea}`,
                data: [newCreatedTicket]
            })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: 'Error when creating new Ticket ' + e })
        }
    }
)

routerTicket.get(
    '/',
    midVerifyValidToken,
    async (req: Request, res: Response) => {
        try {
            const allTickets = await listTickets()
            return res
                .status(httpStatus.OK)
                .json({ status: 'Ticket - Listing ok.', data: allTickets })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: 'Error when listing Ticket ' + e })
        }
    }
)

routerTicket.get(
    '/:TicketID',
    midVerifyValidToken,
    async (req: Request, res: Response) => {
        try {
            const { TicketID } = req.params
            const allTickets = await listTicketsById('id', TicketID)
            return res.status(httpStatus.OK).json({
                status: 'Ticket - Listing by ID ok.',
                data: allTickets
            })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: 'Error when listing Ticket ' + e })
        }
    }
)

routerTicket.delete(
    '/:TicketName',
    // midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { TicketName } = req.params
            const responseRemove = await deleteTickets(
                'ticketName',
                TicketName,
                req.redisClient
            )
            const { error } = (responseRemove as { error: string }) || {}
            if (error) {
                return res.status(httpStatus.OK).json({
                    status: `Ticket - ${error}`
                })
            }
            return res.status(httpStatus.OK).json({
                status: 'Ticket - Record closed (deleted).',
                data: [responseRemove]
            })
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: 'Error when deleting Ticket ' + e })
        }
    }
)

routerTicket.put(
    '/:TicketID',
    midVerifyValidToken,
    bodyParser.json(),
    async (req: Request, res: Response) => {
        try {
            const { TicketID } = req.params
            const responseRemove = await editTickets('id', TicketID, req.body)
            return res.status(httpStatus.NO_CONTENT).json(responseRemove)
        } catch (e) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json({ status: 'Error when deleting Ticket ' + e })
        }
    }
)

export default routerTicket
