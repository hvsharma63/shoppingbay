const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const UserWishlist = require('../models/UserWishlist')
const userWishlist = express.Router()
userWishlist.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

userWishlist.get('/show', (req, res) => {
    res.send("userWishlist API Called");
})
module.exports = userWishlist;