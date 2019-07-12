const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const Category = require('../models/Category')
const categories = express.Router()
categories.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

categories.get('/show', (req, res) => {
    res.send("Categories API Called");
})
module.exports = categories;