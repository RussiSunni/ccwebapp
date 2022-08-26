const express = require('express')
const app = express()

// Middleware ---------
// Need this below middleware to POST
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.set('view engine', 'ejs')

// Home or Create Game page.
app.get('/', (req, res) => {
    res.render("index")
})

// The Pathways WebGL export page.
app.get('/games/pathways', (req, res) => {
    res.render("games/pathways")
})

// -----------------------------------------

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const cohortRouter = require('./routes/cohorts')
app.use('/cohorts', cohortRouter)

const gamesRouter = require('./routes/games')
app.use('/games', gamesRouter)

const gameTypesRouter = require('./routes/game-types')
app.use('/game-types', gameTypesRouter)

app.listen(3000)