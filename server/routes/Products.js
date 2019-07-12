const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const Product = require('../models/Product')
const products = express.Router()
products.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

products.get('/show', (req, res) => {
    res.send("Products API Called");
})

module.exports = products;