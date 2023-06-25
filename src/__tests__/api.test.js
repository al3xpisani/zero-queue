import request from "supertest"
import jestRoutesApp from "../routes/indexJest"
import "dotenv/config"

let validToken = null
let invalidToken = null
let user = "alexandre.pisani.ant@gmail.com"
let pwd = "_test123"

beforeAll(async () => {
    const res = await request(jestRoutesApp)
        .get("/api/token")
        .set("email", user)
        .set("pwd", pwd)
    validToken = res?.body.accessToken
})

describe("Game Of Thrones CRUD Endpoints", () => {
    it("should return a access Token", async () => {
        const res = await request(jestRoutesApp)
            .get("/api/token")
            .set("email", user)
            .set("pwd", pwd)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({ isAuthenticated: true })
    })
    it("should show a invalidated token", async () => {
        const res = await request(jestRoutesApp)
            .post("/api/houses")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send({
                name: "House Baelish of Harrenhal",
                region: "The Riverlands",
                currentLord: "https://anapioficeandfire.com/api/characters/823",
                founded: "299 AC"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({
            isAuthenticated: {
                isAuthenticated: false,
                accessToken: "Invalid token provided by client"
            }
        })
    })
    it("should post a house", async () => {
        const res = await request(jestRoutesApp)
            .post("/api/houses")
            .send({
                name: "House Baelish of Harrenhal",
                region: "The Riverlands",
                currentLord: "https://anapioficeandfire.com/api/characters/823",
                founded: "299 AC"
            })
            .set("Authorization", `Bearer ${validToken}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({
            status: "House - Registro adicionado."
        })
    })
    it("should list the existing houses", async () => {
        const res = await request(jestRoutesApp)
            .get("/api/houses")
            .set("Authorization", `Bearer ${validToken}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({ status: "House - Listagem ok." })
    })
    it("should find house byName", async () => {
        const res = await request(jestRoutesApp)
            .get("/api/houses/name/House Baelish of Harrenhal")
            .set("Authorization", `Bearer ${validToken}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({
            status: "House - Listagem findByName ok."
        })
    })
    it("should find house by ID", async () => {
        const res = await request(jestRoutesApp)
            .get("/api/houses/id/5d5e9709-5b4b-41a5-8ba1-2ad6c751d378")
            .set("Authorization", `Bearer ${validToken}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toMatchObject({
            status: "House - Listagem findByID ok."
        })
    })
    it("should delete house by ID", async () => {
        const res = await request(jestRoutesApp)
            .get("/api/houses/name/House Baelish of Harrenhal")
            .set("Authorization", `Bearer ${validToken}`)
        expect(res.statusCode).toEqual(200)
    })
})
