import fetchFirebaseDataMatch, {
    addFirebaseDocument,
    fetchAllFirebaseData,
    deleteFirebaseDoc,
    updateFirebaseDocument
} from '../config/fetchFirebaseData'
import { v4 as uuidv4 } from 'uuid'
import { RedisQueueSchema, TicketGridSchema } from '../types'
import { addMapQueueData, syncQueue } from '../redis/redis'
import { RedisClientType } from 'redis'
import { clearAccentCapitalize } from '../util/formatWord'

export const createTicketService = async (
    ticketData: TicketGridSchema,
    redisClient: RedisClientType
) => {
    try {
        ticketData.serviceTypeArea = clearAccentCapitalize(
            ticketData.serviceTypeArea
        )
        const hasOpenedTicketInFirebase = await listTicketsByIdService(
            'serviceTypeArea',
            ticketData.serviceTypeArea
        )
        if (hasOpenedTicketInFirebase.length <= 2) {
            await createFirebaseTicket(ticketData)
            return { data: `Ticket created for ${ticketData.serviceTypeArea}` }
        }
        if (hasOpenedTicketInFirebase.length >= 3) {
            await sendTicketToQueue(redisClient, ticketData)
            return { data: `Ticket queued for ${ticketData.serviceTypeArea}` }
        }
        return ticketData
    } catch (e) {
        console.error('Error when creating Ticket :  ', e)
    }
}

const generateID = (ticketData: TicketGridSchema) => {
    const id = uuidv4()
    ticketData['id'] = id
    ticketData['ticketName'] = 'ticket' + id.substring(0, 8)
    ticketData['timeStampIssue'] = new Date().toISOString()
    return ticketData
}

const createFirebaseTicket = async (ticketData: TicketGridSchema) => {
    const ticket = generateID(ticketData)
    await addFirebaseDocument(ticket, process.env.COLLECTION_NAME)
}

const syncFirebaseTicket = async (ticketData: TicketGridSchema) => {
    await addFirebaseDocument(ticketData, process.env.COLLECTION_NAME)
}

const sendTicketToQueue = async (
    redisClient: RedisClientType,
    ticketData: TicketGridSchema
) => {
    const mapQueue = new Map<string, RedisQueueSchema>()
    const ticket = generateID(ticketData)
    mapQueue.set('redis-tickets', {
        id: ticket.id,
        ticketName: ticket.ticketName,
        serviceType: ticket.serviceTypeArea,
        issue: ticket.issue,
        timestampIssue: new Date().toISOString()
    })
    await addMapQueueData(redisClient, ticket.serviceTypeArea, mapQueue)
}

export const listTicketsByIdService = async (
    field: string,
    fieldValue: string
) => {
    try {
        const respAllTickets = await fetchFirebaseDataMatch(
            process.env.COLLECTION_NAME,
            field,
            fieldValue,
            field,
            'true'
        )
        return respAllTickets
    } catch (e) {
        console.error('Error when listing Tickets :  ', e)
    }
}

export const listTicketsService = async () => {
    try {
        const respAllTickets = await fetchAllFirebaseData(
            process.env.COLLECTION_NAME,
            'name',
            'true'
        )
        return respAllTickets
    } catch (e) {
        console.error('Error when listing Tickets :  ', e)
    }
}

export const editTicketsService = async (
    field: string,
    fieldValue: string,
    body: object
) => {
    try {
        const respFetchByField = await updateFirebaseDocument(
            process.env.COLLECTION_NAME,
            field,
            fieldValue,
            body
        )
        return respFetchByField
    } catch (e) {
        console.error('Error when editing Tickets :  ', e)
    }
}

export const deleteTicketsService = async (
    fieldName: string,
    fieldValue: string,
    redisClient: RedisClientType
) => {
    try {
        const responseDelete = await deleteFirebaseDoc(
            process.env.COLLECTION_NAME,
            fieldName,
            fieldValue
        )
        if (responseDelete.length === 0) {
            return {
                error: 'Error when closing ticket. It may be already closed'
            }
        }
        const [
            {
                deletedItem: { serviceTypeArea }
            }
        ] = responseDelete
        const syncResponse = await syncRedisFirebase(
            redisClient,
            serviceTypeArea
        )
        if (syncResponse?.id === -1) {
            return {
                status: `Uhhuuuu :) Theres no ticket in the queue to be synced.`
            }
        }
        let ticketData: TicketGridSchema | null = null
        if ('ticketName' in syncResponse) {
            ticketData = {
                id: syncResponse.id.toString(),
                ticketName: syncResponse.ticketName,
                serviceTypeArea: syncResponse.serviceType,
                issue: syncResponse.issue,
                timestampIssue: syncResponse.timestampIssue
            }
        }
        await syncFirebaseTicket(ticketData)
        return {
            data: `Ticket for area ${ticketData.serviceTypeArea} synced from queue to firebase with ID ${syncResponse.id}`
        }
    } catch (e) {
        return {
            error: `Error when deleting Tickets : ${e} `
        }
    }
}

const syncRedisFirebase = async (
    redisClient: RedisClientType,
    queueName: string
) => {
    const response = await syncQueue(redisClient, queueName)
    return response
}
