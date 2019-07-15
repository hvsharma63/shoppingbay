const jwt = require("jsonwebtoken");
const User = require('../models/User');
SECRET_KEY = 'solution_analyst'

module.exports = function (req, res, next) {
    //get the token from the header if present
    const token = req.headers["authorization"];
    console.log("called from middleware");

    //if no token found, return response (without going to the next middelware)
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    } else {
        const decoded = jwt.verify(token, SECRET_KEY)

        User.findOne({
            where: {
                id: decoded.id
            }
        }).then(user => {
            if (user.role === 'admin') {
                req.user = user
                next();
            } else {
                return res.status(401).send("Access denied");
            }
        }).catch(err => {
            res.send('error: ' + err)
        })
    }
};