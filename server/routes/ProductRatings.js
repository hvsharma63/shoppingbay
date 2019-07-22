const express = require('express')
const cors = require('cors')
const pool = require("../config/db")
const auth = require('../middleware/authenticateUser')
const productRating = express.Router()
productRating.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// Retrieve all productRating
productRating.get('', auth, (req, res) => {
    pool.query(`SELECT ProductRatings.*, Products.name as product, Users.firstName as user FROM ProductRatings LEFT JOIN Users ON Users.id = ProductRatings.userId LEFT JOIN Products ON Products.id = ProductRatings.productId`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No productRating found.' })
        } else {
            res.status(200).send(result)
        }
    });
})

// // Create product
// productRating.post('/create', auth, (req, res) => {
//     req.body.categoryId = parseFloat(req.body.categoryId);
//     req.body.price = parseFloat(req.body.price);
//     req.body.stock = parseFloat(req.body.stock);
//     console.log(req.body);

//     pool.query(`SELECT * from Orders WHERE name = '${req.body.name}'`, (err, result) => {
//         if (err) res.status(500).send({ error: err })
//         if (result.length == 0) {

//             pool.query(`INSERT INTO Orders (categoryId, name, description, price, sku, imagePath, createdAt, stock, stockAvailability)
//             VALUES ('${req.body.categoryId}', '${req.body.name}', '${req.body.description}',${req.body.price},
//             '${req.body.sku}','${req.body.imagePath}', CURDATE(), ${req.body.stock}, ${req.body.stockAvailability})`,
//                 (err, result) => {
//                     if (err) res.status(500).send({ error: err })
//                     if (result) {
//                         res.status(200).send(result);
//                     }
//                 }
//             )
//         } else {
//             res.status(400).send({ message: 'This product already exists' })
//         }
//     });
// })

// Get specific order
// productRating.get('/:id', auth, (req, res) => {
//     pool.query(`SELECT Orders.*, Users.firstName as user FROM Users RIGHT JOIN Orders ON Users.id = Orders.userId WHERE Orders.id = ${req.params.id}`, (err, result) => {
//         if (err) res.status(500).send({ error: err })
//         if (result.length == 0) {
//             res.status(400).send({ message: 'No order found by this ID' })
//         } else {
//             res.status(200).send(result[0])
//         }
//     });
// })

// Update specific product
// productRating.put('/:id/update', auth, (req, res) => {
//     pool.query(`UPDATE Orders SET name='${req.body.name}',imagePath='${req.body.imagePath}',description='${req.body.description}', 
//     updatedAt=CURDATE() WHERE id=${req.params.id}`,
//         (err, result) => {
//             if (err) res.status(500).send({ error: err })
//             if (result) {
//                 res.status(200).send(result);
//             }
//         }
//     )
// })

// Delete specific order
productRating.delete('/:id/delete', auth, (req, res) => {
    pool.query(`DELETE FROM ProductRatings WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )
})


module.exports = productRating;