const express = require('express')
const app = express()
const router = express.Router()
const db = require('./db')

app.use(require('body-parser').json())
app.use(require('morgan')('dev')) // log requests

/** are all values of arr truthy? */
function all(arr) {
    if (!Array.isArray(arr)) throw 'all() only works on arrays'
    return arr.reduce((a, b) => a && b)
}

// Responds with an array of all recipes in the format of {_id: RECIPE_ID, title: RECIPE_TITLE} 
router.get('/', async (req, res) => {
    res.json(await db.getAll())
})

// Responds with the full content of the specified recipe
router.get('/:id', async (req, res) => {
    try {
        res.json(await db.get(req.params.id))
    } catch (e) {
        res.status(404).json(e)
    }
})

// Creates a recipe with the supplied data in the request body, and returns the new recipe
router.post('/', async (req, res) => {
    const recipe = req.body

    if (!all([
        typeof recipe === 'object',

        typeof recipe._id === 'undefined',
        typeof recipe.title === 'string',

        Array.isArray(recipe.ingredients)
        && all(recipe.ingredients.map(ing =>
            typeof ing === 'object'
            && all([typeof ing.name === 'string',
                    typeof ing.amount === 'string'])
        )),

        Array.isArray(recipe.steps)
        && all(recipe.steps.map(step => typeof step === 'string'))

    ])) {
        res.status(400).json({error: 'invalid recipe submitted'})
        return;
    }

    try {
        res.json(await db.create(recipe))
    } catch (e) {
        res.status(400).json(e)
    }
})

// Updates the specified recipe with by replacing the recipe with the new recipe content, and returns the updated recipe
router.put('/:id', async (req, res) => {

})

// Updates the specified recipe with only the supplied changes, and returns the updated recipe
router.patch('/:id', async (req, res) => {

})

// Deletes the recipe and returns nothing
router.delete('/:id', async (req, res) => {

})

app.use('/recipes', router)

// unhandled path or error
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json(err)
})

app.listen(3000, () => console.log('http://localhost:3000'))