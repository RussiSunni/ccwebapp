const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index")
})


app.get('/pathways/yellow', (req, res) => {
    res.render("games/pathways")
})

app.get('/pathways/blue', (req, res) => {
    res.render("games/pathways")
})


const userRouter = require('./routes/users')
app.use('/users', userRouter)
const sessionRouter = require('./routes/sessions')
app.use('/sessions', sessionRouter)



app.listen(3000)