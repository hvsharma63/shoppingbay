const express = require('express')
var cors = require('cors')
const carts = express.Router()
carts.use(cors())
const pool = require("../config/db")
const isLoggedIn = require('../middleware/isLoggedIn');

process.env.SECRET_KEY = 'solution_analyst'

carts.get('/show', (req, res) => {
    res.send("carts API Called");
})

carts.get('/all', isLoggedIn, async (req, res) => {
    try {
        if (req.user) {
            const result = await pool.execute(`SELECT id,userId,productId,quantity from Carts WHERE userId = ${req.user.id}`);
            console.log(result[0]);
            if (result.length == 0) {
                res.status(400).send({ message: 'No Products found' })
            } else {
                res.status(200).send(result[0])
            }
        } else {
            res.status(500).send({ message: 'Access Denied' })
        }
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

carts.post('/create', isLoggedIn, async (req, res) => {
    try {
        console.log(req.body, req.user, req.user.id == req.body.userId);
        if (req.user.id == req.body.userId) {
            const result = await pool.execute(`INSERT INTO Carts (userId, productId, quantity, createdAt)
            VALUES (${req.body.userId},${req.body.productId},${req.body.quantity}, CURDATE())`);
            console.log(result[0]);
            if (result.length == 0) {
                res.status(400).send({ message: 'No Products found' })
            } else {
                res.status(200).send(result[0])
            }
        } else {
            res.status(500).send({ message: 'Access Denied' })
        }
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

module.exports = carts;