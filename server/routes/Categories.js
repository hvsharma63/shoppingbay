const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const Category = require('../models/Category')
const auth = require('../middleware/authenticateUser')
const categories = express.Router()
categories.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

categories.get('/create', auth, (req, res) => {
    res.json("Yes Only Admin can access");
})

categories.post('/login', auth, (req, res) => {
    console.log("post called");
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then(user => {
        console.log(user.role);
        if (user.role !== 'user') {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({ id: JSON.stringify(user.id) }, process.env.SECRET_KEY, {
                    expiresIn: 60
                })
                res.json({ token: token })
            } else {
                res.send('Credentials might be wrong. Try Again :)') //User does not exist
            }
        } else {
            res.send('Not Allowed');
        }
    }).catch(err => {
        if (err.toString().includes("TypeError")) {
            res.send("Credentials might be wrong. Try Again :)")
        }
        res.send("error: " + err);
    })
})
module.exports = categories;