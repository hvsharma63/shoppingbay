const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const Order = require('../models/Order')
const orders = express.Router()
orders.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

orders.get('/show', (req, res) => {
    res.send("Orders API Called");
})
module.exports = orders;