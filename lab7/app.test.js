const app = require('./app')
const db = require('./db')

test("1+1=2", () => expect(1+1).toBe(2))

afterAll(db.close)