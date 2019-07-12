const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

users.post('/register', (req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        profile: req.body.profile,
        contact: req.body.contact,
        resetToken: req.body.resetToken,
        role: req.body.role,
        shippingAddress: req.body.shippingAddress,
        deliveryAddress: req.body.deliveryAddress,
        createdAt: req.body.createdAt,
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            const hash = bcrypt.hashSync(data.password, 10);
            data.password = hash;
            User.create(data)
                .then(user => {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.json({ token: token })
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

users.get('/profile', (req, res) => {
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    User.findOne({
        where: {
            id: decoded.id
        }
    })
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.send('User does not exist')
            }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

module.exports = users;