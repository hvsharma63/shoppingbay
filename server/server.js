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

app.use('/api/carts', Carts)
app.use('/api/categories', Categories)
app.use('/api/deals', Deals)
app.use('/api/order/products', OrderProducts)
app.use('/api/orders', Orders)
app.use('/api/product/images', ProductImages)
app.use('/api/products', Products)
app.use('/api/users', Users)
app.use('/api/user/wishlist', UserWishlist)

app.listen(port, function () {
    console.log('Server is running on port: ' + port)
})