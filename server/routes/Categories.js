const express = require('express')
var cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const bcrypt = require('bcrypt');
const Category = require('../models/Category')
const auth = require('../middleware/authenticateUser')
const categories = express.Router()
categories.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// Retrieve all categories
categories.get('', auth, (req, res) => {
    Category.findAll().then(categories => {
        res.json(categories);
    })
})

// Create category
categories.post('/create', auth, (req, res) => {
    console.log("Categories Post called");
    Category
        .findOrCreate({
            where: {
                name: req.body.name
            },
            defaults: {
                name: req.body.name,
                imagePath: req.body.imagePath,
                description: req.body.description,
                createdAt: req.body.createdAt
            }
        })
        .then(([cat, created]) => {
            res.json(cat);
            console.log(created)
        })
})

// Get specific category
categories.get('/:id', auth, (req, res) => {
    Category.findByPk(req.params.id).then(cat => {
        if (!cat) {
            res.json("Sorry No Categories by this ID found")
        } else {
            res.json(cat)
        }
    })
})

// Update specific category
categories.put('/:id/update', auth, (req, res) => {
    console.log(req.params.id);
    Category.update(
        {
            name: req.body.name,
            imagePath: req.body.imagePath,
            description: req.body.description,
            updatedAt: Date.now(),
        },
        {
            where: { id: req.params.id }
        }
    ).then((cat) => {
        if (cat) {
            res.json(cat)
        }
    }).catch((err) => {
        console.log(err);
    })
})

// Delete specific category
categories.delete('/:id/delete', auth, (req, res) => {
    Category.findByPk(req.params.id)
        .then(cat => {
            return cat.destroy();
        })
        .then(() => {
            res.json("Category Deleted");
        })
})


module.exports = categories;