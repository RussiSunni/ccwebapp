const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

router.use(bodyParser.json());
router.use(methodOverride('_method'));


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

/**
 * Get All Items
 *
 * @return response()
 */
router.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        let sqlQuery = "SELECT * FROM users";
        let query = conn.query(sqlQuery, (err, results) => {
            if (err) throw err;
            res.render('list-users');
        });
    }
    else {
        res.redirect('/login');
    }
});


/**
 * Get Single Item
 *
 * @return response()
 */
router.get('/show/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let sqlQuery = `
    SELECT *
    FROM conscious_coding.users
    WHERE conscious_coding.users.id = ` + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});


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
            res.redirect("/users");
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

router.get('/:id/edit', (req, res) => {
    res.render('edit-user', { userId: req.params.id });
});

router.put('/:id/edit', (req, res) => {
    console.log(req.body);

    let sqlQuery = "UPDATE users SET name='" + req.body.name + "', email = '" + req.body.email + "', dob = '" + req.body.dob + "', is_admin = '" + req.body.is_admin + " ' WHERE id=" + req.params.id;

    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.redirect("/users");
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