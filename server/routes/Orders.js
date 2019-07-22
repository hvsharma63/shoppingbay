const express = require('express')
const cors = require('cors')
const pool = require("../config/db")
const auth = require('../middleware/authenticateUser')
const orders = express.Router()
orders.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// Retrieve all orders
orders.get('', auth, (req, res) => {
    pool.query(`SELECT Orders.*, Users.firstName as user FROM Users RIGHT JOIN Orders ON Users.id = Orders.userId`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No orders found.' })
        } else {
            res.status(200).send(result)
        }
    });
})



// // Create product
// orders.post('/create', auth, (req, res) => {
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
orders.get('/:id/products', auth, (req, res) => {
    console.log("singleProduct Details called");

    pool.query(`SELECT OrderProducts.*, 
        Products.name as product, Products.price as productPrice 
        FROM OrderProducts LEFT JOIN Orders ON Orders.id = OrderProducts.orderId 
        LEFT JOIN Products ON Products.id = OrderProducts.productId
        WHERE OrderProducts.orderId = ${req.params.id};
        `, (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result.length == 0) {
                res.status(400).send({ message: 'No order found by this ID' })
            } else {
                res.status(200).send(result)
            }
        });
})

// Update specific product
// orders.put('/:id/update', auth, (req, res) => {
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
orders.delete('/:id/delete', auth, (req, res) => {
    console.log(req.body, req.params);

    pool.query(`DELETE FROM Orders WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )
})


module.exports = orders;