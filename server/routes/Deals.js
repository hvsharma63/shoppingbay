const express = require('express')
const cors = require('cors')
const pool = require("../config/db")
const auth = require('../middleware/authenticateAdmin')
const deals = express.Router()
deals.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// Retrieve all deals
deals.get('', auth, (req, res) => {
    pool.query(`SELECT Deals.*, Products.name as productName FROM Deals LEFT JOIN Products ON Deals.productId = Products.id`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No Deals found.' })
        } else {
            res.status(200).send(result)
        }
    });
})

// Create a Deal
deals.post('/create', auth, (req, res) => {
    console.log(req.body);
    pool.query(`SELECT * from Deals WHERE name = '${req.body.name}'`, (err, result) => {
        console.log(result);
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            pool.query(`INSERT INTO Deals (name, productId, discount, startDate, endDate, createdAt)
                        VALUES ('${req.body.name}', ${req.body.productId}, ${req.body.discount}, '${req.body.startDate}', '${req.body.endDate}', CURDATE())`,
                (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    if (result) {
                        res.status(200).send(result);
                    }
                }
            )
        } else {
            res.status(400).send({ message: 'This Deal already exists' })
        }
    });
});



// Update specific Deal
deals.put('/:id/update', auth, (req, res) => {
    console.log(req.body);
    console.log(req.params.id);

    pool.query(`UPDATE Deals SET name='${req.body.name}', productId = ${req.body.productId},
    discount = ${req.body.discount}, startDate = '${req.body.startDate}', endDate = '${req.body.endDate}', 
    updatedAt=CURDATE() WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )

})

// Delete specific category
deals.delete('/:id/delete', auth, (req, res) => {
    pool.query(`DELETE FROM Deals WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )
})

// Get specific Deal
deals.get('/:id', auth, (req, res) => {
    pool.query(`SELECT * from Deals WHERE id = ${req.params.id}`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(400).send({ message: 'No Category found by this ID' })
        } else {
            res.status(200).send(result[0])
        }
    });
})
module.exports = deals;