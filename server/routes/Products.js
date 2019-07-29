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
// Retrieve all products {{ ADMIN }}
products.get('/', auth, (req, res) => {
    console.log(req.query);
    pool.query(`SELECT Products.*, Deals.discount, Deals.startDate, Deals.endDate, Deals.id as DealId, Categories.name as category FROM Products LEFT JOIN Categories ON Categories.id = Products.categoryId LEFT JOIN Deals ON Deals.productId = Products.id;`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No products found.' })
        } else {
            res.status(200).send(result)
        }
    });
})

// GET Searched Products
products.get('/search', (req, res) => {
    console.log("called from params");
    console.log(req.query.products);
    pool.query(`SELECT *, Categories.name as category FROM Categories 
                RIGHT JOIN Products ON Categories.id = Products.categoryId
                WHERE Products.name LIKE '%${req.query.products}%';
                `, (err, result) => {
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
products.post('/create', upload.single('productImage'), auth, async (req, res, next) => {
    console.log("some");
    const file = req.file;
    console.log(req.body);
    skipDiscount = false;
    const filePath = req.protocol + '://' + 'localhost:3500' + '/' + req.file.path;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    if (req.body.stock > 0) {
        req.body.stockAvailability = true;
    } else {
        req.body.stockAvailability = false;
    }
    if (req.body.startDate == '' || req.body.endDate == '' || req.body.discount == '') {
        req.body.startDate = null;
        req.body.endDate = null;
        req.body.discount = null;
        skipDiscount = true;
    }
    try {
        const productSearch = await pool.execute(`SELECT * from Products WHERE name = '${req.body.name}'`);
        if (productSearch[0].length == 0) {
            const productInsert = await pool.execute(`INSERT INTO Products (categoryId, name, description, price, sku, imagePath, createdAt, stock, stockAvailability)
                    VALUES ('${req.body.categoryId}', '${req.body.name}', '${req.body.description}',${req.body.price},
                    '${req.body.sku}','${filePath}', CURDATE(), ${req.body.stock}, ${req.body.stockAvailability})`);
            if (productInsert) {
                console.log(productInsert[0].insertId);
                if (!skipDiscount) {
                    console.log('inside skip discount');

                    const dealInsert = await pool.execute(`INSERT INTO Deals (productId, discount, startDate, endDate, createdAt) VALUES ( ${productInsert[0].insertId}, ${req.body.discount}, '${req.body.startDate}', '${req.body.endDate}', CURDATE())`);
                    console.log(dealInsert[0]);
                    if (dealInsert) {
                        console.log('inside deal insert');

                        return res.status(200).send({
                            success: 'true',
                            message: "Product & Deal Created Successfully",
                            product: productInsert,
                            deal: dealInsert
                        });
                    }
                }
                return res.status(200).send({
                    success: 'true',
                    message: "Product Created Successfully",
                    product: productInsert,
                });
            }
        }
    } catch (error) {
        res.send({ error: error })
    }
})

// Get specific product
products.get('/:id', auth, async (req, res) => {
    try {
        const productSearch = await pool.execute('SELECT Products.*, Deals.discount, Deals.startDate, Deals.endDate, Deals.id as DealId FROM Products LEFT JOIN Deals ON Deals.productId = Products.id WHERE Products.id = ? ', [req.params.id]);
        res.status(200).send(productSearch[0][0]);
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

// Update specific product
products.put('/:id/update', auth, async (req, res) => {
    req.body.price = parseFloat(req.body.price);
    req.body.stock = parseInt(req.body.stock);
    req.body.discount = parseFloat(req.body.discount);
    deleteDiscount = false;
    if (req.body.stock > 0) {
        req.body.stockAvailability = true;
    } else {
        req.body.stockAvailability = false;
    }
    if (req.body.startDate == '' || req.body.endDate == '' || req.body.discount == '' || isNaN(req.body.discount) ||
        req.body.startDate === null || req.body.endDate === null || req.body.discount === null) {
        deleteDiscount = true;
    }
    console.log(req.body);
    try {
        const productUpdate = await pool.execute(`UPDATE Products SET name='${req.body.name}', categoryId=${req.body.categoryId},
        description='${req.body.description}', sku='${req.body.sku}',imagePath='${req.body.imagePath}', price=${req.body.price},
        stock=${req.body.stock},stockAvailability=${req.body.stockAvailability},updatedAt=CURDATE() WHERE id=${req.params.id}`);
        if (productUpdate) {
            if (!deleteDiscount) {
                const dealSearch = await pool.execute(`SELECT * FROM Deals WHERE productId=${req.params.id}`)
                if (dealSearch[0].length == 0) {
                    sql = `INSERT INTO Deals (productId, discount, startDate, endDate, createdAt) VALUES ( ${req.params.id}, ${req.body.discount}, '${req.body.startDate}', '${req.body.endDate}', CURDATE())`
                } else {
                    sql = `UPDATE Deals SET discount = ${req.body.discount}, startDate = '${req.body.startDate}', endDate = '${req.body.endDate}',updatedAt=CURDATE() 
                    WHERE productId = ${req.params.id}`;
                }
            }
            if (deleteDiscount) {
                sql = `DELETE FROM Deals WHERE productId=${req.params.id}`;
            }
            const dealUpdate = await pool.execute(sql);
            console.log(dealUpdate[0]);
            if (dealUpdate) {
                return res.status(200).send({
                    success: 'true',
                    message: "Product & Deal Updated Successfully",
                    product: productUpdate,
                    deal: dealUpdate
                });
            }
            return res.status(200).send({
                success: 'true',
                message: "Product Updated Successfully",
                product: productUpdate,
            });
        }
    } catch (error) {
        res.status(500).send({ error: err })
    }

})

// Delete specific product
products.delete('/:id/delete', auth, async (req, res) => {
    try {
        const productDelete = pool.execute(`DELETE FROM Products WHERE id=${req.params.id}`);
        const dealDelete = await pool.execute(`DELETE FROM Deals WHERE productId=${req.params.id}`);
        res.status(200).send({ product: productDelete, deal: dealDelete });
    } catch (error) {
        res.status(500).send({ error: error })
    }
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