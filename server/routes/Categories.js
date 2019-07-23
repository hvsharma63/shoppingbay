const express = require('express')
const cors = require('cors')
const pool = require("../config/db")
const auth = require('../middleware/authenticateUser')
const categories = express.Router()
const validator = require('validator')
// Image Upload Configs
const multer = require('multer');
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/categoryImages')
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


categories.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// GET all Categories' names
categories.get('/names', auth, (req, res) => {
    pool.query(`SELECT id,name from Categories`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No Categories found.' })
        } else {
            res.status(200).send(result)
        }
    });
})

// Retrieve all categories
categories.get('', auth, (req, res) => {
    pool.query(`SELECT * from Categories`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(200).send({ message: 'No Categories found.' })
        } else {
            res.status(200).send(result)
        }
    });
})

// Create category
categories.post('/create', upload.single('categoryImage'), auth, (req, res, next) => {
    const file = req.file
    const filePath = req.protocol + '://' + req.get("host") + '/' + req.file.path;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    pool.query(`SELECT * from Categories WHERE name = '${req.body.name}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            pool.query(`INSERT INTO Categories (name, imagePath, description, createdAt)
                        VALUES ('${req.body.name}', '${filePath}','${req.body.description}', CURDATE())`,
                (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    if (result) {
                        res.status(200).send(result);
                    }
                }
            )
        } else {
            res.status(400).send({ message: 'This Category already exists' })
        }
    });
})

// Get specific category
categories.get('/:id', auth, (req, res) => {
    console.log("CALLED FROM HERE");

    pool.query(`SELECT * from Categories WHERE id = ${req.params.id}`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(400).send({ message: 'No Category found by this ID' })
        } else {
            res.status(200).send(result[0])
        }
    });
})

// Update specific category
categories.put('/:id/update', auth, (req, res) => {
    pool.query(`UPDATE Categories SET name='${req.body.name}',imagePath='${req.body.imagePath}',description='${req.body.description}', 
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
categories.delete('/:id/delete', auth, (req, res) => {
    pool.query(`DELETE FROM Categories WHERE id=${req.params.id}`,
        (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result) {
                res.status(200).send(result);
            }
        }
    )
})


module.exports = categories;