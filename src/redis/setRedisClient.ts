import { Request, Response, NextFunction, Express } from 'express'
import { RedisResponse } from '../types'
import { RedisClientType, createClient } from 'redis'

export const setRedisClient = (app: Express) => {
    const { SERVER: redisServer, REDIS_PORT: redisPort } = process.env
    const errorOnRedisClient: RedisResponse = {
        redisClientError: false
    }
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        if (app?.locals?.isRedisClientOpened) {
            req.redisClient = app?.locals?.isRedisClientOpened
            next()
            return
        }
        try {
            const url = `redis://${redisServer}:${redisPort}`
            const client: RedisClientType = createClient({ url })
            setRedisEvents(client, url)
            await client.connect()
            req.redisClient = client
            app.locals.isRedisClientOpened = client
            next()
        } catch (error) {
            console.log('Error getting redis client module ' + error)
            res.status(400).send({ errorOnRedisClient })
        }
    }
}

const setRedisEvents = (client: RedisClientType, url: string) => {
    client.on('connect', () => {
        console.info(`Redis is listening at ${url}`)
    })
    client.on('reconnecting', () => console.log('Redis reconnecting'))
    client.on('end', () => {
        console.log('Redis client connection ended')
    })
    client.on('error', (err) => console.error(`Redis Error: ${err}`))
}
