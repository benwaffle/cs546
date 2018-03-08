const MongoClient = require('mongodb').MongoClient

const conn = MongoClient.connect('mongodb://localhost:27017')
const uuid = require('uuid/v4')

const coll = conn.then(c => c.db('lab7-recipes')).then(db => db.collection('recipes'))

module.exports = {
    async getAll() {
        const db = await coll
        return await db.find({}, {projection: {_id: true, title: true}}).toArray()
    },

    async get(_id) {
        const db = await coll
        const recipe = await db.findOne({ _id })
        if (recipe == null)
            throw {error: `no such recipe: ${_id}`}
        return recipe
    },

    async create(recipe) {
        const db = await coll
        const _id = uuid()
        const res = await db.insert({ _id, ...recipe })
        if (res.error)
            throw {error: res.error}
        if (res.insertedCount != 1)
            throw {error: 'something bad happened... 0 or multiple elements were inserted'}
        return this.get(_id)
    }
}