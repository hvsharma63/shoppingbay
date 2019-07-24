const express = require('express')
var cors = require('cors')
const userWishlist = express.Router()
userWishlist.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

userWishlist.get('/show', (req, res) => {
    res.send("userWishlist API Called");
})
module.exports = userWishlist;