const express = require('express')
const app = express()
const router = express.Router()
const db = require('./db')

app.use(require('body-parser').json())
app.use(require('morgan')('dev')) // log requests

// Responds with an array of all recipes in the format of {_id: RECIPE_ID, title: RECIPE_TITLE} 
router.get('/', async (req, res) => {
    res.json(await db.getAll())
})

// Responds with the full content of the specified recipe
router.get('/:id', async (req, res) => {
    const recipe = await db.get(req.params.id)
    if (recipe)
        res.json(recipe)
    else
        res.status(404).json({error: `No such recipe: ${req.params.id}`})
})

// Creates a recipe with the supplied data in the request body, and returns the new recipe
router.post('/', (req, res) => {

})

// Updates the specified recipe with by replacing the recipe with the new recipe content, and returns the updated recipe
router.put('/:id', (req, res) => {

})

// Updates the specified recipe with only the supplied changes, and returns the updated recipe
router.patch('/:id', (req, res) => {

})

// Deletes the recipe and returns nothing
router.delete('/:id', (req, res) => {

})

app.use('/recipes', router)

app.listen(3000, () => console.log('http://localhost:3000'))
