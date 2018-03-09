const fs = require('fs')
const request = require('supertest')
const uuid = require('uuid/v4')
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
    const _id = res.body._id

    const res2 = await request(app).delete(`/recipes/${_id}`)
    expect(res2.statusCode).toBe(200)
    expect(res2.text.length).toBe(0)

    const res3 = await request(app).get(`/recipes/${_id}`)
    expect(res3.statusCode).toBe(404)
})

test('PUT', async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const res = await request(app).post('/recipes/').send(egg)
    expect(res.statusCode).toBe(200)
    const _id = res.body._id

    const pasta = JSON.parse(fs.readFileSync('./pasta.json'))
    const res2 = await request(app).put(`/recipes/${res.body._id}`).send(pasta)
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toEqual({ _id, ...pasta })

    await request(app).delete(`/recipes/${_id}`)
})

test('PUT non-existing recipe', async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const _id = uuid()

    const pasta = JSON.parse(fs.readFileSync('./pasta.json'))
    const res2 = await request(app).put(`/recipes/${_id}`).send(pasta)
    expect(res2.statusCode).toBe(404)
})

test('PATCH /', async () => {
    const egg = JSON.parse(fs.readFileSync('./egg.json'))
    const res = await request(app).post('/recipes/').send(egg)
    expect(res.statusCode).toBe(200)
    const _id = res.body._id

    const res2 = await request(app).patch(`/recipes/${res.body._id}`).send({
        title: "memes"
    })
    expect(res2.statusCode).toBe(200)
    expect(res2.body).toEqual({
        _id,
        ...egg,
        title: "memes"
    })

    const res3 = await request(app).get(`/recipes/${_id}`)
    expect(res3.body).toEqual({
        _id,
        ...egg,
        title: "memes"
    })

    await request(app).delete(`/recipes/${_id}`)
})

test('PATCH non-existing recipe', async () => {
    const _id = uuid()

    const pasta = JSON.parse(fs.readFileSync('./pasta.json'))
    const res2 = await request(app).patch(`/recipes/${_id}`).send({ title: 'asdf' })
    expect(res2.statusCode).toBe(404)
})


afterAll(async () => {
    await db.deleteAll()
    await db.close()
})