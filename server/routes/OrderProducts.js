const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const OrderProduct = require('../models/OrderProduct')
const orderProducts = express.Router()
orderProducts.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

orderProducts.get('/show', (req, res) => {
    res.send("orderProducts API Called");
})
module.exports = orderProducts;