const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const User = require('../models/User')
const auth = require("../middleware/authenticateUser");

users.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// REGISTER
users.post('/register', (req, res) => {
    console.log(req.body);
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        role: req.body.role,
        profile: req.body.profile,
        resetToken: req.body.resetToken,
        shippingAddress: req.body.shippingAddress,
        deliveryAddress: req.body.deliveryAddress,
        createdAt: req.body.createdAt,
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        console.log("from node" + user);
        if (!user) {
            const hash = bcrypt.hashSync(data.password, 10);
            data.password = hash;
            User.create(data)
                .then(user => {
                    res.status(200);
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
        } else {
            res.json({ error: 'User already exists' })
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
})

// LOGIN
users.post('/login', (req, res) => {
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
                    expiresIn: 3600
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

users.get('/something', auth, (req, res) => {
    res.json("admin only")
});

users.get('/profile', auth, (req, res) => {
    const user = req.user;
    // console.log("profile:", user.dataValues);

    if (user) {
        res.json(user)
    } else {
        res.send('User does not exist')
    }

})

module.exports = users;