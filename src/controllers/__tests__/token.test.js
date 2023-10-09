// token.test.js
import request from 'supertest'
import express from 'express'
import fetchMock from 'jest-fetch-mock'
import routerToken from '../../routes/token/token'

let validToken = null
let invalidToken = null
let user = 'alexandre.pisani.ant@gmail.com'
let pwd = '_test123'

beforeAll(() => {
    fetchMock.enableMocks()
})

beforeEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
})

const app = express()
app.use('/api/token', routerToken)

jest.mock('../../middleware/authentication', () => ({
    firebaseAuth: jest.fn((req, res, next) => {
        next()
    })
}))

describe('Token Route Tests', () => {
    it('should return a valid token', async () => {
        const firebaseAuth = require('../../middleware/authentication')
        firebaseAuth.firebaseAuth.mockImplementationOnce((req, res, next) => {
            req.body = JSON.stringify({
                user: {
                    uid: '5ZP0uaBJvqbZTWW2wr6BtBuKVL43',
                    email: 'alexandre.pisani.ant@gmail.com',
                    emailVerified: true,
                    isAnonymous: false,
                    providerData: [
                        {
                            providerId: 'password',
                            uid: 'alexandre.pisani.ant@gmail.com',
                            displayName: null,
                            email: 'alexandre.pisani.ant@gmail.com',
                            phoneNumber: null,
                            photoURL: null
                        }
                    ],
                    stsTokenManager: {
                        refreshToken:
                            'AMf-vBw5C_AQigJV0NeS5aFFucOJCznhjaRfoCwteLAyRYk9GcwYfG1QpYymSbBwCTnsYNR-a9L9nG7gzIftGKhBbFcs2rkZfcWJj6_DGE906iND4E-MZIwAUbaWprQzkaf8wvijCIIkncnprH-AzFP52tp1skKU3Aql0nKwGWgexiQg_Vj7hDiGc7OMum0o2WV0FRJTsZyK1Td2WIeyLK1Zw-q3wt_C2-a2Pw1Ax2dNK4FI3FaOebY',
                        accessToken:
                            'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vemVyb3F1ZXVlLTMwODk0IiwiYXVkIjoiemVyb3F1ZXVlLTMwODk0IiwiYXV0aF90aW1lIjoxNjk2ODA5NDcxLCJ1c2VyX2lkIjoiNVpQMHVhQkp2cWJaVFdXMndyNkJ0QnVLVkw0MyIsInN1YiI6IjVaUDB1YUJKdnFiWlRXVzJ3cjZCdEJ1S1ZMNDMiLCJpYXQiOjE2OTY4MDk0NzEsImV4cCI6MTY5NjgxMzA3MSwiZW1haWwiOiJhbGV4YW5kcmUucGlzYW5pLmFudEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbGV4YW5kcmUucGlzYW5pLmFudEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OgbPzXy-Q_y8YDFjO9WMBC0AyU5GQxCAS36V3g5ejJwkOPJznl6LlprI1AQqGMlAUf5YiAX1cNst4qGe2DX8_DsfcRBleXVJgJJIXP1Lx0wt6GvXFSgaUyCj-afaEE082SDqGOa77u-2Db4mq3H8xl2H6jzo3Pt5ErT2WAxu4zLy8p4QglVsw9ZmbX0CImeRgT4qwNfA1bN2YgZCOs7kTZJpm9qWG5fRSaT6NEp87zf6X0vtvDybRRxhRVAH06dXVRx_w0HxSWTmZo5y6pnqahM9k0lzs25lnjNtxR6WlQtfvd-zVCeHfpa7XfCtSHD0m4pkJ1_cqVAw38YqNguv5g',
                        expirationTime: 1696813063216
                    },
                    createdAt: '1679430948231',
                    lastLoginAt: '1696809471319',
                    apiKey: 'AIzaSyAuf7ohDCRnu_CU50dOF3PH_7HaIFfvfvk',
                    appName: '[DEFAULT]'
                },
                providerId: null,
                _tokenResponse: {
                    kind: 'identitytoolkit#VerifyPasswordResponse',
                    localId: '5ZP0uaBJvqbZTWW2wr6BtBuKVL43',
                    email: 'alexandre.pisani.ant@gmail.com',
                    displayName: '',
                    idToken:
                        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vemVyb3F1ZXVlLTMwODk0IiwiYXVkIjoiemVyb3F1ZXVlLTMwODk0IiwiYXV0aF90aW1lIjoxNjk2ODA5NDcxLCJ1c2VyX2lkIjoiNVpQMHVhQkp2cWJaVFdXMndyNkJ0QnVLVkw0MyIsInN1YiI6IjVaUDB1YUJKdnFiWlRXVzJ3cjZCdEJ1S1ZMNDMiLCJpYXQiOjE2OTY4MDk0NzEsImV4cCI6MTY5NjgxMzA3MSwiZW1haWwiOiJhbGV4YW5kcmUucGlzYW5pLmFudEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbGV4YW5kcmUucGlzYW5pLmFudEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OgbPzXy-Q_y8YDFjO9WMBC0AyU5GQxCAS36V3g5ejJwkOPJznl6LlprI1AQqGMlAUf5YiAX1cNst4qGe2DX8_DsfcRBleXVJgJJIXP1Lx0wt6GvXFSgaUyCj-afaEE082SDqGOa77u-2Db4mq3H8xl2H6jzo3Pt5ErT2WAxu4zLy8p4QglVsw9ZmbX0CImeRgT4qwNfA1bN2YgZCOs7kTZJpm9qWG5fRSaT6NEp87zf6X0vtvDybRRxhRVAH06dXVRx_w0HxSWTmZo5y6pnqahM9k0lzs25lnjNtxR6WlQtfvd-zVCeHfpa7XfCtSHD0m4pkJ1_cqVAw38YqNguv5g',
                    registered: true,
                    refreshToken:
                        'AMf-vBw5C_AQigJV0NeS5aFFucOJCznhjaRfoCwteLAyRYk9GcwYfG1QpYymSbBwCTnsYNR-a9L9nG7gzIftGKhBbFcs2rkZfcWJj6_DGE906iND4E-MZIwAUbaWprQzkaf8wvijCIIkncnprH-AzFP52tp1skKU3Aql0nKwGWgexiQg_Vj7hDiGc7OMum0o2WV0FRJTsZyK1Td2WIeyLK1Zw-q3wt_C2-a2Pw1Ax2dNK4FI3FaOebY',
                    expiresIn: '3600'
                },
                operationType: 'signIn'
            })
            next()
        })

        const response = await request(app).get('/api/token')
        validToken = response?.body.accessToken

        expect(response.statusCode).toEqual(200)
        expect(response.body).toMatchObject({ isAuthenticated: true })
    })

    it('should handle an error and return an invalid token', async () => {
        // Mocking an error in the middleware
        const firebaseAuth = require('../../middleware/authentication')
        firebaseAuth.firebaseAuth.mockImplementationOnce((req, res, next) => {
            req.body = JSON.stringify({ invalidTokenKey: 1 })
            res.status(400).json({ isAuthenticated: false })
        })

        const response = await request(app).get('/api/token')
        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({ isAuthenticated: false })
    })
})
