const fs = require('fs')
const request = require('supertest')
const app = require('./app')
const db = require('./db')

test("can read", async () => {
    const res = await request(app).get('/recipes/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual([])
})

test("can post", async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const res = await request(app).post('/recipes/').send(egg)

    expect(res.statusCode).toEqual(200)
    expect(res.body._id).toBeDefined()
    expect(res.body).toEqual({
        _id: res.body._id,
        ...egg
    })
})

afterAll(async () => {
    await db.deleteAll()
    await db.close()
})