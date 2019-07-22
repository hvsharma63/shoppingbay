const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const auth = require("../middleware/authenticateUser");
const pool = require("../config/db")
users.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// REGISTER
users.post('/register', (req, res) => {
    pool.query(`SELECT * from Users WHERE email = '${req.body.email}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            const hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hash;
            pool.query(`INSERT INTO Users(firstName, lastName, email, password, dob, profile, contact, role, createdAt)
                        VALUES ('${req.body.firstName}', '${req.body.lastName}','${req.body.email}', '${req.body.password}', 
                        '${req.body.dob}', '${req.body.profile}', ${req.body.contact},'${req.body.role}',CURDATE())`,
                (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    if (result) {
                        res.status(200).send(result);
                    }
                }
            )
        } else {
            res.status(400).send({ message: 'User with this email already exists' })
        }
    });

})

// LOGIN
users.post('/login', (req, res) => {
    pool.query(`SELECT * from Users WHERE email = '${req.body.email}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(500).send({ message: 'You must register your account first' })
        } else {
            if (result[0].role !== 'user') {
                if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    let token = jwt.sign({ id: JSON.stringify(result[0].id) }, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })
                    res.status(200).send({ token: token })
                } else {
                    res.status(400).send({ message: 'Credentials might be wrong. Try Again :)' }) //User does not exist
                }
            } else {
                res.status(400).send({ message: 'Not Allowed' });
            }
        }
    });

})

// GET User Profile
users.get('/profile', auth, (req, res) => {
    const user = req.user;
    // console.log("profile:", user.dataValues);

    if (user) {
        res.json(user)
    } else {
        res.send('User does not exist')
    }

})

users.post('/changePassword', auth, (req, res) => {
    pool.query(`SELECT * from Users WHERE id = ${req.body.id}`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(500).send({ message: 'You are not a registered user' })
        } else {
            if (bcrypt.compareSync(req.body.oldPassword, result[0].password)) {
                const hash = bcrypt.hashSync(req.body.newPassword, 10);
                req.body.newPassword = hash;
                pool.query(`UPDATE Users SET password='${req.body.newPassword}' WHERE id = ${req.body.id};`, (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    res.status(200).send({ message: 'Password changed successfully' })
                })
            } else {
                res.status(400).send({ message: 'Credentials might be wrong. Try Again :)' }) //User does not exist
            }
        }
    });
})

module.exports = users;