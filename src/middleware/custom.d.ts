import { RedisClientType } from 'redis'

declare module 'express' {
    interface Request {
        redisClient: RedisClientType
    }
}
