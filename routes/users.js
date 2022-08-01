const express = require('express')
const router = express.Router()


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
    console.log('Mysql connected...');
});


/**
 * Get All Items
 *
 * @return response()
 */
router.get('/', (req, res) => {
    let sqlQuery = "SELECT * FROM users";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('list-users', { students: results });
    });
});



// /**
//  * Get Single Item
//  *
//  * @return response()
//  */
// router.get('/:id', (req, res) => {
//     //let sqlQuery = "SELECT * FROM users WHERE id=" + req.params.id;

//     // let query = conn.query(sqlQuery, (err, results) => {
//     //     if (err) throw err;
//     //     res.render('show-user', { student: results });
//     // });

//     res.send("user with id " + req.params.id);
// });


// Add user
router.get('/add', (req, res) => {
    res.render('add-user')
})

/**
 * Create New Item
 *
 * @return response()
 */
router.post('/', (req, res) => {
    let data = { first_name: req.body.first_name, last_name: req.body.last_name, team: req.body.team, nick_name: req.body.nick_name };
    let sqlQuery = "INSERT INTO users SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        // res.send(apiResponse(results));
    });
});





module.exports = router