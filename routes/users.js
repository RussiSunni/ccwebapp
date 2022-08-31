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
    //password: 'C0nsc!0u5C0d!ng2022',
    password: '',
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


/**
 * Get All Items
 *
 * @return response()
 */
router.get('/', (req, res) => {
    let sqlQuery = "SELECT * FROM users";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('list-users');
    });
});


// // /**
// //  * Get Single Item
// //  *
// //  * @return response()
// //  */
// // router.get('/:id', (req, res) => {
// //     //let sqlQuery = "SELECT * FROM users WHERE id=" + req.params.id;

// //     // let query = conn.query(sqlQuery, (err, results) => {
// //     //     if (err) throw err;
// //     //     res.render('show-user', { student: results });
// //     // });

// //     res.send("user with id " + req.params.id);
// // });


// Add user
router.get('/add', (req, res) => {
    res.render('add-user')
})

/**
 * Create New Item 
 *
 * @return response()
 */
router.post('/add', (req, res) => {
    let data = { email: req.body.email, name: req.body.name, dob: req.body.dob, cohort_id: req.body.cohort, is_admin: req.body.is_admin };

    let sqlQuery = "INSERT INTO users SET ?";
    let query = conn.query(sqlQuery, data, (err, results) => {
        if (err) {
            throw err;
        }
        else {
            res.render('list-users');
        }
    });
});


/**
 * Update Item
 *
 * @return response()
 */
router.put('/:id', (req, res) => {
    let sqlQuery = "UPDATE users SET login_link='" + req.body.login_link + "' WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('index');
    });
});


/**
 * Delete Item
 *
 * @return response()
 */
router.delete('/:id', (req, res) => {
    let sqlQuery = "DELETE FROM users WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('list-users');
    });
});



module.exports = router