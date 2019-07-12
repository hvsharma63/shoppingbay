const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const Deal = require('../models/Deal')
const deals = express.Router()
deals.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

deals.get('/show', (req, res) => {
    res.send("deals API Called");
})
module.exports = deals;