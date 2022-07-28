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
    password: '',
    database: 'conscious_coding'
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
    if (err) throw err;
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

//     let sqlQuery = `SELECT first_name, last_name, name AS skill_name, is_mastered, parent
//     FROM skill_tree.user_skills 
//     JOIN skill_tree.users 
//     ON user_skills.user_id = users.id 
//     JOIN skill_tree.skills 
//     ON user_skills.skill_id = skills.id 
//     WHERE user_id =` + req.params.id;

//     let query = conn.query(sqlQuery, (err, results) => {
//         if (err) throw err;
//         res.render('show-user', { student: results });
//     });
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
    let data = { first_name: req.body.first_name, last_name: req.body.last_name };
    let sqlQuery = "INSERT INTO users SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});





module.exports = router