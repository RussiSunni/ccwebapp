const express = require('express')
const router = express.Router()


const mysql = require('mysql');

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'conscious_coding'
// });

// /*------------------------------------------
// --------------------------------------------
// Shows Mysql Connect
// --------------------------------------------
// --------------------------------------------*/
// conn.connect((err) => {
//     if (err) throw err;
//     console.log('Mysql connected...');
// });


/**
 * Get All Sessions
 *
 * @return response()
 */
router.get('/', (req, res) => {
    let sqlQuery = "SELECT * FROM sessions";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('list-sessions', { sessions: results });
    });
});


// Add session
router.get('/add', (req, res) => {
    res.render('add-session')
})

/**
 * Create New Session
 *
 * @return response()
 */
router.post('/', (req, res) => {
    let data = { name: req.body.name };
    let sqlQuery = "INSERT INTO sessions SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});


module.exports = router