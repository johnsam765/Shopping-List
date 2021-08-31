const express = require("express")
const router = express.Router()
    // Model
const User = require("../../Models/user")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require('jsonwebtoken')

// @route GET api/users
// @desc Register users
// @access Public
router.post("/", (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
        // Simple Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            msg: "Please enter all fields"
        })
    }
    // Check for existing user
    User.findOne({
            email: email
        })
        .then(user => {
            if (user) {
                return res.status(404).json({
                    msg: "User already exists"
                })
            }
            const newUser = new User({
                name,
                email,
                password
            });
            // Create Salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    }
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            jwt.sign({
                                    id: user._id
                                },
                                config.get("jwtSecret"), {
                                    expiresIn: 3600
                                }, (err, token) => {
                                    if (err) {
                                        throw err
                                    }
                                    return res.json({
                                        token: token,
                                        user: {
                                            name: user.name,
                                            id: user._id,
                                            email: user.email
                                        }
                                    })
                                }
                            )

                        })
                })
            })
        })
})

module.exports = router