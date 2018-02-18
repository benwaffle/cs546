const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const settings = JSON.parse(fs.readFileSync('settings.json'))

let connection;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(settings.mongo.server)
  }

  return await connection.db(settings.mongo.database)
}

module.exports.close = async () => {
  if (connection) {
    connection.close()
  }
}
