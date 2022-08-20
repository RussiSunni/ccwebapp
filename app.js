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


app.get('/games/pathways', (req, res) => {
    res.render("games/pathways")
})

// -----------------------------------------

const mysql = require('mysql');

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


// app.get('/games/api', (req, res) => {
//     let sqlQuery = "SELECT * FROM games";
//     let query = conn.query(sqlQuery, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         res.send(results);
//     });
// });


// ------------------------------------------



// const userRouter = require('./routes/users')
// app.use('/users', userRouter)

// const gameRouter = require('./routes/games')
// app.use('/games', gameRouter)

const cohortRouter = require('./routes/cohorts')
app.use('/cohorts', cohortRouter)

app.listen(3000)