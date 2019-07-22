const express = require('express')
const cors = require('cors')
const pool = require("../config/db")
const auth = require('../middleware/authenticateUser')
const orders = express.Router()

orders.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// Get specific category
orders.get('/:id', auth, (req, res) => {
    console.log("CALLED FROM HERE");
    pool.query(`SELECT * from OrderProducts WHERE orderId = ${req.params.id}`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(400).send({ message: 'No Details found by this Order\'s ID' })
        } else {
            res.status(200).send(result[0])
        }
    });
})

module.exports = orders;