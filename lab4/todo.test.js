const fs = require('fs')
const conn = require('./connection')
const todo = require('./todo')

test('functions throw on missing args', async () => {
  await expect(todo.createTask()).rejects.toBeDefined()
  await expect(todo.getTask()).rejects.toBeDefined()
  await expect(todo.completeTask()).rejects.toBeDefined()
  await expect(todo.removeTask()).rejects.toBeDefined()
})

test('can create task', async () => {
  await expect(todo.createTask('title', 'desc')).resolves.toEqual(
    expect.objectContaining({
      title: 'title',
      description: 'desc'
    })
  )
})

test('can get task', async () => {
  const task1 = await todo.createTask('title', 'desc')
  await expect(todo.getTask(task1._id)).resolves.toEqual(task1)

  await expect(todo.getTask('asdf')).rejects.toBeDefined()
})

test('can get all tasks', async () => {
  const task1 = await todo.createTask('title', 'desc')
  const task2 = await todo.createTask('title', 'desc')

  await expect(todo.getAllTasks()).resolves.toEqual(
    expect.arrayContaining([
      task1,
      task2
    ])
  )
})

test('can complete task', async () => {
  const task1 = await todo.createTask('title', 'desc')

  await expect(todo.completeTask(task1._id)).resolves.toEqual(
    expect.objectContaining({
      completed: true,
      completedAt: expect.any(Date)
    })
  )
  await expect(todo.getTask(task1._id)).resolves.toEqual(
    expect.objectContaining({
      completed: true,
      completedAt: expect.any(Date)
    })
  )

  await expect(todo.completeTask('asdf')).rejects.toBeDefined()
})

test('can remove task', async () => {
  const task1 = await todo.createTask('title', 'desc')
  await expect(todo.removeTask(task1._id)).resolves.toBe(true)
  await expect(todo.getTask(task1._id)).rejects.toBeDefined()

  await expect(todo.removeTask('asdf')).rejects.toBeDefined()
})

afterAll(conn.close)
