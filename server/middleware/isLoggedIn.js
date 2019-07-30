const jwt = require("jsonwebtoken");
const pool = require("../config/db")
SECRET_KEY = 'solution_analyst'

module.exports = async function (req, res, next) {
    //get the token from the header if present
    const token = req.headers["authorization"];
    console.log("called from middleware");
    try {
        if (token) {
            jwt.verify(token, SECRET_KEY, async function (err, decoded) {
                if (err) {
                    next();
                } else if (decoded) {
                    const rows = await pool.execute(`SELECT * from Users WHERE id = '${decoded.id}'`);
                    req.user = rows[0][0]
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).send({ error: error })
    }

};