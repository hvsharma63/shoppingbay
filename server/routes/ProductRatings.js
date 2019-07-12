const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const ProductRating = require('../models/ProductRating')
const productRatings = express.Router()
productRatings.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

productRatings.get('/show', (req, res) => {
    res.send("productRatings API Called");
})
module.exports = productRatings;