// import { RequestHandler } from 'express'
// import { Request, Response, NextFunction } from 'express'
// import { RedisResponse } from '../types'
// import { RedisClientType, createClient } from 'redis'

// export const midRedisClient: RequestHandler = (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const errorOnRedisClient: RedisResponse = {
//         redisClientError: false
//     }
//     const { SERVER: redisServer, REDIS_PORT: redisPort } = process.env
//     try {
//         console.log('opnened againnnnnnnn ')
//         const client: RedisClientType = createClient({
//             url: `redis://${redisServer}:${redisPort}`
//         })
//         setRedisEvents(client)
//         ;(async () => {
//             await client.connect()
//         })()
//         req.redisClient = client
//         next()
//     } catch (error) {
//         console.log('Error getting redis client module ' + error)
//         return res.json({ errorOnRedisClient })
//     }
// }

// const setRedisEvents = (client: RedisClientType) => {
//     client.on('connect', () => {
//         console.info('Redis connected')
//     })
//     client.on('reconnecting', () => console.log('Redis reconnecting'))
//     client.on('ready', () => {
//         console.info('Redis ready!')
//     })
//     client.on('end', () => {
//         console.log('Redis client connection ended')
//     })
//     client.on('error', (err) => console.error(`Redis Error: ${err}`))
// }
