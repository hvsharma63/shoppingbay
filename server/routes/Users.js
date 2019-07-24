const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const auth = require("../middleware/authenticateUser");
const pool = require("../config/db")
const validator = require("validator")
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'harshvardhan.sharma.sa@gmail.com',
        pass: '*********'
    }
});
users.use(cors())

process.env.SECRET_KEY = 'solution_analyst'

// REGISTER {{ Common }}
users.post('/register', (req, res) => {

    if (validator.matches(req.body.firstName, /^[A-Za-z]+$/) === false ||
        validator.isLength(req.body.firstName, [{ min: 3, max: 50 }] === false)) {
        return res.status(500).send({ message: "Something is wrong with firstname" })
    }
    if (validator.matches(req.body.firstName, /^[A-Za-z]+$/) === false ||
        validator.isLength(req.body.firstName, [{ min: 3, max: 50 }] === false)) {
        return res.status(500).send({ message: "Something is wrong with lastname" })
    }
    if (validator.isEmail(req.body.email) === false) {
        return res.status(500).send({ message: "Kindly check the email" })
    }
    if (validator.isLength(req.body.contact, [{ min: 10, max: 13 }] === false)) {
        return res.status(500).send({ message: "Kindly check the email" })
    }
    if (validator.matches(req.body.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+*!=]).*$/) === false) {
        return res.status(500).send({ message: "password does not match the criteria" })
    }
    pool.query(`SELECT * from Users WHERE email = '${req.body.email}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            const hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hash;
            pool.query(`INSERT INTO Users(firstName, lastName, email, password, dob, contact, createdAt)
                        VALUES ('${req.body.firstName}', '${req.body.lastName}','${req.body.email}', '${req.body.password}', 
                        '${req.body.dob}', ${req.body.contact},CURDATE())`,
                (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    if (result) {
                        res.status(200).send(result);
                    }
                }
            )
        } else {
            res.status(400).send({ message: 'User with this email already exists' })
        }
    });

})

// LOGIN {{ ADMIN }}    
users.post('/login', (req, res) => {
    console.log(req.body);
    pool.query(`SELECT * from Users WHERE email = '${req.body.email}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(500).send({ message: 'You must register your account first' })
        } else {
            if (result[0].role !== 'user') {
                if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    let token = jwt.sign({ id: JSON.stringify(result[0].id) }, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })
                    res.status(200).send({ token: token })
                } else {
                    res.status(400).send({ message: 'Credentials might be wrong. Try Again :)' }) //User does not exist
                }
            } else {
                res.status(400).send({ message: 'Not Allowed' });
            }
        }
    });
})

// GET User Profile {{ ADMIN }}
users.get('/profile', auth, (req, res) => {
    const user = req.user;
    // console.log("profile:", user.dataValues);

    if (user) {
        res.json(user)
    } else {
        res.send('User does not exist')
    }

})

// LOGIN {{ USER }}
users.post('/user/login', (req, res) => {
    if (validator.isEmail(req.body.email) === false) {
        return res.status(500).send({ message: "Kindly check the email" })
    }
    // if (validator.matches(req.body.password, /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+*!=]).*$/) === false) {
    //     return res.status(500).send({ message: "password does not match the criteria" })
    // }
    pool.query(`SELECT * from Users WHERE email = '${req.body.email}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(500).send({ message: 'You must register your account first' })
        } else {
            if (result[0].role === 'user') {
                if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    let token = jwt.sign({ id: JSON.stringify(result[0].id) }, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    })
                    res.status(200).send({ token: token })
                } else {
                    res.status(400).send({ message: 'Credentials might be wrong. Try Again :)' }) //User does not exist
                }
            } else {
                res.status(400).send({ message: 'Not Allowed' });
            }
        }
    });
})

// Check If EMAIL exists & send TOKEN to EMAIL {{ USER }}
users.post('/user/sendTokenToEmail', (req, res) => {
    if (validator.isEmail(req.body.email) === false) {
        return res.status(500).send({ message: "Kindly check the email" })
    }
    console.log(req.body);
    pool.query(`SELECT * from Users WHERE email ='${req.body.email}'`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(500).send({ message: 'You are not a registered user, register first!' })
        } else {
            let payload = {
                id: result[0].id,        // User ID from database
                email: result[0].email
            }
            let secret = crypto.randomBytes(16).toString('hex');
            let token = jwt.sign(payload, secret, {
                expiresIn: 3600
            })
            pool.query(`UPDATE Users SET resetTokenSecret='${secret}', resetToken='${token}' WHERE id = ${payload.id};`, (err, result) => {
                if (err) res.status(500).send({ error: err })
                if (!(result.length == 0)) {
                    link = '<a href="http://localhost:4200/resetPassword/' + payload.id + '/' + token + '">Reset password</a>';
                    const mailOptions = {
                        from: 'harshvardhan.sharma@solutionanalysts.com', // sender address
                        to: 'jimitraval@yahoo.com', // list of receivers
                        subject: 'Password Recent Link', // Subject line
                        html: link
                    };

                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err)
                            console.log(err)
                        else
                            res.status(200).send({ message: "Password Link has been sent to your email ID. Kindly check it" })
                    });
                }
            });


        }
    });
})

// Change Password {{ USER }}
users.post('user/changePassword', auth, (req, res) => {
    pool.query(`SELECT * from Users WHERE id = ${req.body.id}`, (err, result) => {
        if (err) res.status(500).send({ error: err })
        if (result.length == 0) {
            res.status(500).send({ message: 'You are not a registered user' })
        } else {
            if (bcrypt.compareSync(req.body.oldPassword, result[0].password)) {
                const hash = bcrypt.hashSync(req.body.newPassword, 10);
                req.body.newPassword = hash;
                pool.query(`UPDATE Users SET password='${req.body.newPassword}' WHERE id = ${req.body.id};`, (err, result) => {
                    if (err) res.status(500).send({ error: err })
                    res.status(200).send({ message: 'Password changed successfully' })
                })
            } else {
                res.status(400).send({ message: 'Credentials might be wrong. Try Again :)' }) //User does not exist
            }
        }
    });
})

module.exports = users;