import { TicketGridSchema } from '../types'
import {
    createTicketService,
    listTicketsByIdService,
    listTicketsService,
    editTicketsService,
    deleteTicketsService
} from '../services/ticketService'
import { RedisClientType } from 'redis'

export const createTicket = async (
    TicketData: TicketGridSchema,
    redisClient: RedisClientType
) => {
    try {
        return await createTicketService(TicketData, redisClient)
    } catch (error) {
        throw new Error('Error creating Ticket: ' + error.message)
    }
}
export const listTicketsById = async (field: string, fieldValue: string) => {
    try {
        return await listTicketsByIdService(field, fieldValue)
    } catch (error) {
        throw new Error('Error listing Tickets: ' + error.message)
    }
}
export const listTickets = async () => {
    try {
        return await listTicketsService()
    } catch (error) {
        throw new Error('Error listing Tickets: ' + error.message)
    }
}
export const editTickets = async (
    field: string,
    fieldValue: string,
    body: object
) => {
    try {
        return await editTicketsService(field, fieldValue, body)
    } catch (error) {
        throw new Error('Error editing Tickets: ' + error.message)
    }
}
export const deleteTickets = async (
    fieldName: string,
    fieldValue: string,
    redisClient: RedisClientType
) => {
    try {
        return await deleteTicketsService(fieldName, fieldValue, redisClient)
    } catch (error) {
        throw new Error('Error deleting Tickets: ' + error.message)
    }
}
