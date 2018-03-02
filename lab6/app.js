const express = require('express')

const app = express()

app.get('/about', (req, res) => {
    res.json({
        name: 'Ben Iofel',
        cwid: 10409085,
        biography: 'line 1\nline 2',
        favoriteShows: ['The Magicians', 'The Office']
    })
})

app.get('/story', (req, res) => {
    res.json({
        'storyTitle': 'Story Title',
        'story': 'Your story.\nSimply use line breaks for paragraphs.\nLike this.'
    })
})

app.get('/education', (req, res) => {
    res.json([
        {
            schoolName: 'Stevens',
            degree: 'Bachelors',
            favoriteClass: 'CS392',
            favoriteMemory: 'Meeting khayyam saleem'
        },
        {
            schoolName: 'BCA',
            degree: 'High school',
            favoriteClass: 'AI',
            favoriteMemory: 'chilling'
        },
        {
            schoolName: 'Solomon Schechter',
            degree: 'Middle School',
            favoriteClass: 'Math',
            favoriteMemory: 'stuff'
        }
    ])
})

app.listen(3000, () => console.log('http://localhost:3000'))