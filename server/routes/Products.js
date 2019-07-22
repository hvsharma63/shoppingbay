const express = require('express')
const cors = require('cors')
const pool = require("../config/db")
const auth = require('../middleware/authenticateUser')
const products = express.Router()

const multer = require('multer');
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/productImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + MIME_TYPE_MAP[file.mimetype])
    }
})

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (MIME_TYPE_MAP[file.mimetype])
            return cb(null, true);
        else
            return cb(new Error('Only JPEG,PNG,JPG files are allowed'));
    },
    limits: {
        fileSize: 5 * 1024 * 1024,  // 5 MB upload limit
        files: 1                    // 1 file
    },
    storage: storage
})

products.use(cors())

process.env.SECRET_KEY = 'solution_analyst'
// Retrieve all products
products.get('', auth, (req, res) => {
    pool.query(`SELECT *, Categories.name as category FROM Categories RIGHT JOIN Products ON Categories.id = Products.categoryId`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No products found.' })
        } else {
            res.status(200).send(result)
        }
    });
})

// Get all product names,id
products.get('/allProductNames', auth, (req, res) => {
    pool.query(`SELECT id,name FROM Products`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No products found.' })
        } else {
            res.status(200).send(result)
        }
    });
})


// GET All Products Rating
products.get('/ratings', auth, (req, res) => {
    pool.query(`SELECT ProductRatings.*, Products.name as product, Users.firstName as user FROM ProductRatings LEFT JOIN Users ON Users.id = ProductRatings.userId LEFT JOIN Products ON Products.id = ProductRatings.productId`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No productRating found.' })
        } else {
            res.status(200).send(result)
        }
    });
})
// Create product
products.post('/create', upload.single('productImage'), auth, (req, res, next) => {
    console.log(req.body);
    console.log(req.file);

    const file = req.file
    const filePath = req.protocol + '://' + req.get("host") + '/' + req.file.path;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    pool.query(`SELECT * from Products WHERE name = '${req.body.name}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {

            pool.query(`INSERT INTO Products (categoryId, name, description, price, sku, imagePath, createdAt, stock, stockAvailability)
            VALUES ('${req.body.categoryId}', '${req.body.name}', '${req.body.description}',${req.body.price},
            '${req.body.sku}','${filePath}', CURDATE(), ${req.body.stock}, ${req.body.stockAvailability})`,
                (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    if (result) {
                        res.status(200).send(result);
                    }
                }
            )
        } else {
            res.status(400).send({ message: 'This product already exists' })
        }
    });
})

// Get specific product
products.get('/:id', auth, (req, res) => {
    console.log("called from get id");

    pool.query(`SELECT * from Products WHERE id = ${req.params.id}`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(400).send({ message: 'No product found by this ID' })
        } else {
            result[0].price = (result[0].price).toString();
            result[0].stock = (result[0].stock).toString();
            // result[0].stockAvailability = (Boolean(result[0].stockAvailability)).toString();
            console.log(result[0]);
            res.status(200).send(result[0])
        }
    });
})

// Update specific product
products.put('/:id/update', auth, (req, res) => {
    console.log(req.params.id);
    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    console.log(req.body);

    pool.query(`UPDATE Products SET name='${req.body.name}', categoryId=${req.body.categoryId},
    description='${req.body.description}', sku='${req.body.sku}', price=${req.body.price},
    stock=${req.body.stock},stockAvailability=${req.body.stockAvailability}, 
    updatedAt=CURDATE() WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )

})

// Delete specific product
products.delete('/:id/delete', auth, (req, res) => {
    pool.query(`DELETE FROM Products WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )
})

// Delete specific product
products.delete('/:id/rating/delete', auth, (req, res) => {
    pool.query(`DELETE FROM ProductRatings WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )
})
module.exports = products;