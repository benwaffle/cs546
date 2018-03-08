const MongoClient = require('mongodb').MongoClient

const conn = MongoClient.connect('mongodb://localhost:27017')
const uuid = require('uuid/v4')

const coll = conn
    .then(c => c.db('lab7-recipes'))
    .then(db => db.collection('recipes'))

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
        return _id
    },

    async put(recipe) {
        await this.delete(recipe._id)
        return await this.create(recipe)
    },

    async patch(recipe) {
        const db = await coll
        const res = await db.updateOne({ _id: recipe._id }, { $set: recipe })
        if (res.error)
            throw {error: res.error}
    },

    async delete(_id) {
        const res = await db.deleteOne({ _id })
        if (res.error)
            throw {error: res.error}
        if (res.result.deletedCount != 1)
            throw {error: 'something bad happened'}
    }
}