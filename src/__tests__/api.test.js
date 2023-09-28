import request from "supertest"
import app from "../index"

const jestRoutesApp = app.listen()
let validToken = null
let invalidToken = null
let user = "alexandre.pisani.ant@gmail.com"
let pwd = "_test123"

describe("Game Of Thrones CRUD Endpoints", () => {
    afterAll(() => jestRoutesApp.close())
    beforeAll(async () => {
        const res = await request(jestRoutesApp)
            .get("/api/token")
            .set("email", user)
            .set("pwd", pwd)
        validToken = res?.body.accessToken
    })
    it("should return a access Token", async () => {
        const res = await request(jestRoutesApp)
            .get("/api/token")
            .set("email", user)
            .set("pwd", pwd)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({ isAuthenticated: true })
    })
})
