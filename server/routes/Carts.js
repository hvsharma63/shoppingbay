const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const Cart = require('../models/Cart')
const carts = express.Router()
carts.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

carts.get('/show', (req, res) => {
    res.send("carts API Called");
})
module.exports = carts;