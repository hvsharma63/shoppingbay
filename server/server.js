const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3500
const path = require('path');

app.use("/assets", express.static(path.join(__dirname, 'assets')));
// app.use("/assets/categoryImages", express.static(path.join("/assets/categoryImages")));
// app.use(express.static('/assets/categoryImages'));

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const Carts = require('./routes/Carts')
const Categories = require('./routes/Categories')
const Deals = require('./routes/Deals')
const OrderProducts = require('./routes/OrderProducts')
const Orders = require('./routes/Orders')
const ProductImages = require('./routes/ProductImages')
const Products = require('./routes/Products')
const Users = require('./routes/Users')
const UserWishlist = require('./routes/UserWishlists')

app.use('/carts', Carts)
app.use('/categories', Categories)
app.use('/deals', Deals)
app.use('/order/products', OrderProducts)
app.use('/orders', Orders)
app.use('/product/images', ProductImages)
app.use('/products', Products)
app.use('/users', Users)
app.use('/user/wishlist', UserWishlist)

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})