export type AuthResponse = {
    isAuthenticated: boolean
    accessToken: string | null
}

export type RedisResponse = {
    redisClientError: boolean
}

export type FirebaseOptions = {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
}

export enum Servicetype {
    Cartao = 'Cartao',
    Emprestimo = 'Emprestimo',
    Outros = 'Outros'
}

export type RedisQueueSchema = {
    id: string
    ticketName: string
    serviceTypeArea: Servicetype
    issue: string
    timestampIssue: string
}

export type TicketGridSchema = {
    id: string
    ticketName: string
    serviceTypeArea: Servicetype
    issue: string
    timestampIssue: string
}
