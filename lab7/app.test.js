const fs = require('fs')
const request = require('supertest')
const app = require('./app')
const db = require('./db')

test('GET /', async () => {
    const res = await request(app).get('/recipes/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual([])
})

test('POST /', async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const res = await request(app).post('/recipes/').send(egg)

    expect(res.statusCode).toBe(200)
    expect(res.body._id).toBeDefined()
    expect(res.body).toEqual({
        _id: res.body._id,
        ...egg
    })
})

test('DELETE', async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const res = await request(app).post('/recipes/').send(egg)
    expect(res.statusCode).toBe(200)

    const res2 = await request(app).delete(`/recipes/${res.body._id}`)
    expect(res2.statusCode).toBe(200)
    expect(res2.text.length).toBe(0)
})

test('PUT /', async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const res = await request(app).post('/recipes/').send(egg)
    expect(res.statusCode).toBe(200)

    const pasta = JSON.parse(fs.readFileSync('./pasta.json'))
    const res2 = await request(app).put(`/recipes/${res.body._id}`).send(pasta)
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toEqual({
        _id: res.body._id,
        ...pasta
    })
})

afterAll(async () => {
    await db.deleteAll()
    await db.close()
})