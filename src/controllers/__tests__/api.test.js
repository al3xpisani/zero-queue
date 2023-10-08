import { getUsers, getUserById } from '../user/user'
const url = 'https://www.smartbox.com/users/'
describe('Test Users', () => {
    it('should return users', async () => {
        const result = await getUsers(url)
        expect(result.length).toBeGreaterThan(0)
    })

    it('should return users promise', (done) => {
        getUsers(url).then((result) => {
            expect(result.length).toBeGreaterThan(0)
            done()
        })
    })

    it('should return a user', () => {
        return getUserById(url, 1).then((result) => {
            expect(result.id).toBe(1)
        })
    })

    it('should return an error - user not found', async () => {
        try {
            expect.assertions(1)
            const result = await getUserById(url)
        } catch (err) {
            expect(err.message).toMatch('code 404')
        }
    })
})
