const express = require('express')
const app = express()

// Middleware ---------
// Need this below middleware to POST
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))
app.set('view engine', 'ejs')

const cookieParser = require("cookie-parser");
const sessions = require('express-session');
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser middleware
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// a variable to save a session
var session;

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'C0nsc!0u5C0d!ng2022',
    //password: '',
    database: 'conscious_coding'
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
    if (err) {
        console.log("MySQL not connected problem");
        // throw err;
    }
    else {
        console.log('Mysql connected...');
    }
});

// Routes -----------------

// Home or Create Game page.
app.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.render('index', { userId: session.userid });
    }
    else {
        res.redirect('/login');
    }
})


// The Pathways WebGL export page.
app.get('/games/pathways', (req, res) => {
    res.render("games/pathways")
})


// Login page
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login-attempt', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    var sqlQuery = "";

    if (req.body.password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password.
        sqlQuery = "SELECT * FROM conscious_coding.users WHERE conscious_coding.users.is_admin = 1 AND conscious_coding.users.email = '" + req.body.email + "' AND conscious_coding.users.password = '" + req.body.password + "';";
    }
    else if (req.body.admin_code) {
        sqlQuery = "SELECT * FROM conscious_coding.users WHERE conscious_coding.users.is_admin = 1 AND conscious_coding.users.email = '" + req.body.email + "' AND conscious_coding.users.admin_code = '" + req.body.admin_code + "';";
    }

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            session = req.session;
            session.userid = req.body.email;
            res.redirect('/');
        } else {
            res.end();
            // res.send('Incorrect Username and/or Password!');
        }
        res.end();
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});



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