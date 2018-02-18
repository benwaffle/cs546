const todoItems = require('./connection').todoItems
const uuid = require('uuid/v4')

async function createTask(title, description) {
  if (typeof title !== 'string') throw new Error('invalid title')
  if (typeof description !== 'string') throw new Error('invalid description')

  const coll = await todoItems()

  const res = await coll.insertOne({
    _id: uuid(),
    title,
    description,
    completed: false,
    completedAt: null
  })

  if (res.insertedCount === 0) throw new Error('could not insert task')

  return await this.getTask(res.insertedId)
}

async function getAllTasks() {
  const coll = await todoItems()
  return await coll.find({}).toArray();
}

async function getTask(_id) {
  if (typeof _id !== 'string') throw new Error('invalid ID')

  const coll = await todoItems()
  const item = await coll.findOne({ _id })

  if (item === null) throw new Error('no such task')

  return item
}

async function completeTask(_id) {
  if (typeof _id !== 'string') throw new Error('invalid ID')

  const coll = await todoItems()
  const res = await coll.updateOne({ _id }, {$set: {
    completed: true,
    completedAt: new Date()
  }})

  if (res.modifiedCount === 0) throw new Error(`could not update ${_id}`)

  return await this.getTask(_id)
}

async function removeTask(_id) {
  if (typeof _id !== 'string') throw new Error('invalid ID')

  const coll = await todoItems()
  const res = await coll.removeOne({ _id })

  if (res.deletedCount === 0) throw new Error(`could not delete ${_id}`)

  return true
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  completeTask,
  removeTask
}
