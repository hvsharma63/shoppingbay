const jwt = require("jsonwebtoken");
const pool = require("../config/db")
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
        pool.query(`SELECT * from Users WHERE id = '${decoded.id}'`, (err, result) => {
            if (err) res.status(500).send({ error: err })
            if (result[0].role === 'admin') {
                req.user = result[0]
                next();
            } else {
                return res.status(401).send({ message: "Access denied" });
            }
        })
    }
};