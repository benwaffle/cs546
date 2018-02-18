const conn = require('./connection')
const todo = require('./todo')

async function main() {
  const task1 = await todo.createTask(
    'Ponder Dinosaurs',
    'Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?'
  )
  console.log(task1)

  const task2 = await todo.createTask(
    'Play Pokemon with Twitch TV',
    'Should we revive Helix?'
  )

  console.log(await todo.getAllTasks())

  await todo.removeTask(task1._id)

  console.log(await todo.getAllTasks())

  console.log(await todo.completeTask(task2._id))

  conn.close()
}

main()
