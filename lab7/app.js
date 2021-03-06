const express = require('express')
const app = express()
const router = express.Router()
const db = require('./db')

app.use(require('body-parser').json())
if (process.env.NODE_ENV !== 'test')
    app.use(require('morgan')('dev')) // log requests

const handleErrors = fn => (req, res, next) => fn(req, res, next).catch(next)

// Responds with an array of all recipes in the format of {_id: RECIPE_ID, title: RECIPE_TITLE} 
router.get('/', handleErrors(async (req, res) => {
    res.json(await db.getAll())
}))

// Responds with the full content of the specified recipe
router.get('/:id', handleErrors(async (req, res) => {
    try {
        res.json(await db.get(req.params.id))
    } catch (e) {
        res.status(404).json(e)
    }
}))

function isRecipe(recipe, partial = false) {
    /** are all values of arr truthy? */
    function all(arr) {
        if (!Array.isArray(arr)) throw 'all() only works on arrays'
        return arr.reduce((a, b) => a && b)
    }

    /**
     * magic function to assert we have the right type
     * @type - type we want
     * @val - value to check
     * @cb - predicate for children if val has a .map() method,
     *       otherwise just a function to call if the type check succeeds
     */
    function expect(type, val, cb) {
        const check = (type === 'array') ? Array.isArray(val) : typeof val === type

        if (check) { // if we have the type we want
            if (cb) {
                if (type === 'array') return all(val.map(cb)) // check all children of array
                else return cb() // check children of object
            }
            else return true
        } else if (partial) { // if we allow undefined
            return typeof val === 'undefined'
        } else { // if we don't allow undefined
            return false
        }
    }

    return typeof recipe === 'object'
        && typeof recipe._id === 'undefined'
        && expect('string', recipe.title)
        && expect('array', recipe.ingredients, (ing) =>
            expect('object', ing, () =>
                expect('string', ing.name) && expect('string', ing.amount)
            )
        )
        && expect('array', recipe.steps, (step) => expect('string', step))
}

// Creates a recipe with the supplied data in the request body, and returns the new recipe
router.post('/', handleErrors(async (req, res) => {
    const recipe = req.body

    if (!isRecipe(recipe)) {
        res.status(400).json({error: 'invalid recipe submitted'})
        return
    }

    const _id = await db.create(recipe)
    res.json(await db.get(_id))
}))

// Updates the specified recipe with by replacing the recipe with the new recipe content, and returns the updated recipe
router.put('/:id', handleErrors(async (req, res) => {
    const recipe = req.body

    if (!isRecipe(recipe)) {
        res.status(400).json({error: 'invalid recipe submitted'})
        return
    }

    await db.put({ _id: req.params.id, ...recipe })
    res.json(await db.get(req.params.id))
}))

// Updates the specified recipe with only the supplied changes, and returns the updated recipe
router.patch('/:id', handleErrors(async (req, res) => {
    const recipe = req.body

    if (!isRecipe(recipe, true)) {
        res.status(400).json({error: 'invalid recipe submitted'})
        return
    }

    await db.patch({ _id: req.params.id, ...recipe })
    res.json(await db.get(req.params.id))
}))

// Deletes the recipe and returns nothing
router.delete('/:id', handleErrors(async (req, res) => {
    await db.delete(req.params.id)
    res.status(200).end()
}))

app.use('/recipes', router)

// unhandled path or error
app.use((err, req, res, next) => {
    res.status(err.status || 400).json({
        error: err,
        message: err.message,
        stack: err.stack
    })
})

module.exports = app