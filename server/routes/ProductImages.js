const express = require('express')
var cors = require('cors')
const productImages = express.Router()
productImages.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

productImages.get('/show', (req, res) => {
    res.send("productImages API Called");
})
module.exports = productImages;