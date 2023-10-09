import request from 'supertest'
import app from '../../index'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

describe('Firebase Authentication Integration Test', () => {
    it('should authenticate with Firebase', async () => {
        const email = 'alexandre.pisani.ant@gmail.com'
        const password = '_test123'

        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        const response = await request(app)
            .get('/api/token')
            .set('email', email)
            .set('pwd', password)
            .set('Authorization', `Bearer ${userCredential.accessToken}`)
        const { isAuthenticated } = response
        expect(response.status).toBe(200)
        expect(isAuthenticated).toBeTruthy
    })
})
