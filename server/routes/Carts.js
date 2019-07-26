const express = require('express')
var cors = require('cors')
const carts = express.Router()
carts.use(cors())
const pool = require("../config/db")

process.env.SECRET_KEY = 'solution_analyst'

carts.get('/show', (req, res) => {
    res.send("carts API Called");
})

carts.get('/something', async (req, res) => {
    try {
        const rows = await pool.execute('SELECT * FROM `Users` WHERE `fiName` = ?', ['Hvardhan']);
        res.send(rows[0]);
    } catch (error) {
        res.send(error)
    }
})

module.exports = carts;