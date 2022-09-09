const express = require('express')
const router = express.Router()
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');

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

router.get('/list', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let sqlQuery = "SELECT * FROM users";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
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
    session = req.session;
    if (session.userid) {
        res.render('add-user');
    }
    else {
        res.redirect('/login');
    }
})

/**
 * Create New Item 
 *
 * @return response()
 */
router.post('/add', (req, res) => {
    session = req.session;
    if (session.userid) {
        var adminLink = "";
        var adminCode = "";
        var url = req.protocol + '://' + req.get('host') + "/login";
        var data = {};
        if (req.body.is_admin == 1) {
            adminCode = uuidv4();
            adminLink = url + "?" + adminCode;
            data = { email: req.body.email, name: req.body.name, dob: req.body.dob, cohort_id: req.body.cohort, is_admin: req.body.is_admin, admin_link: adminLink, admin_code: adminCode };
        }
        else {
            data = { email: req.body.email, name: req.body.name, dob: req.body.dob, cohort_id: req.body.cohort, is_admin: req.body.is_admin };
        }

        let sqlQuery = "INSERT INTO users SET ?";
        let query = conn.query(sqlQuery, data, (err, results) => {
            if (err) {
                throw err;
            }
            else {
                res.redirect("/users");
            }
        });
    }
    else {
        res.redirect('/login');
    }
});


/**
 * Update Item
 *
 * @return response()
 */
router.put('/:id', (req, res) => {
    session = req.session;
    if (session.userid) {
        let sqlQuery = "UPDATE users SET login_link='" + req.body.login_link + "' WHERE id=" + req.params.id;

        let query = conn.query(sqlQuery, (err, results) => {
            if (err) throw err;
            res.render('index');
        });
    }
    else {
        res.redirect('/login');
    }
});

router.get('/:id/edit', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.render('edit-user', { userId: req.params.id });
    }
    else {
        res.redirect('/login');
    }
});

router.put('/:id/edit', (req, res) => {
    session = req.session;
    if (session.userid) {
        var sqlQuery1;
        var sqlQuery2;
        if (req.body.is_admin == 1) {
            var adminLink = "";
            var adminCode = "";

            // Check if they already have an admin code. If so, do nothing.
            sqlQuery2 = "SELECT admin_code FROM users WHERE id=" + req.params.id;
            let query = conn.query(sqlQuery2, (err, results) => {
                if (err) throw err;

                console.log(results[0].admin_code);
                if (results[0].admin_code != null && results[0].admin_code != "") {
                    adminCode = results[0].admin_code;

                }
                else {
                    // If not.                   
                    adminCode = uuidv4();
                }

                var url = req.protocol + '://' + req.get('host') + "/login";
                adminLink = url + "?" + adminCode;
                sqlQuery1 = "UPDATE users SET name='" + req.body.name + "', email = '" + req.body.email + "', dob = '" + req.body.dob + "', is_admin = '" + req.body.is_admin + "', admin_code = '" + adminCode + "', admin_link = '" + adminLink + "' WHERE id=" + req.params.id;

                // Duplicated due to async nature of request.
                let query = conn.query(sqlQuery1, (err, results) => {
                    if (err) throw err;
                    res.redirect("/users");
                });
            });
        }
        else {
            sqlQuery1 = "UPDATE users SET name='" + req.body.name + "', email = '" + req.body.email + "', dob = '" + req.body.dob + "', is_admin = '" + req.body.is_admin + "', admin_code = '', admin_link = '' WHERE id=" + req.params.id;

            let query = conn.query(sqlQuery1, (err, results) => {
                if (err) throw err;
                res.redirect("/users");
            });
        }
    }
    else {
        res.redirect('/login');
    }
});


/**
 * Delete Item
 *
 * @return response()
 */
router.delete('/:id', (req, res) => {
    session = req.session;
    if (session.userid) {
        let sqlQuery = "DELETE FROM users WHERE id=" + req.params.id;

        let query = conn.query(sqlQuery, (err, results) => {
            if (err) throw err;
            res.render('list-users');
        });
    }
    else {
        res.redirect('/login');
    }
});



module.exports = router