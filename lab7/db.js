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
        return await db.findOne({ _id })
    }
}