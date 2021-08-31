const express = require("express")
const router = express.Router()
    // Model
const User = require("../../Models/user")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require('jsonwebtoken')
const auth = require("../../middleware/auth")

// @route POST api/auth
// @desc Authenticate the user
// @access Public
router.post("/", (req, res) => {
        const {
            email,
            password
        } = req.body
            // Simple Validation
        if (!email || !password) {
            return res.status(400).json({
                msg: "Please enter all fields"
            })
        }
        // Check for existing user
        User.findOne({
                email: email
            })
            .then(user => {
                if (!user) {
                    return res.status(400).json({
                        msg: "User doesn't exists"
                    })
                }

                // Validate Password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({
                            msg: "Invalid Credentials"
                        })
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
    // @route GET api/auth/user
    // @desc GET user data
    // @access Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password") //To discard the password field ie to not to send the password field
        .then((user) => {
            return res.json(user)
        })
})

module.exports = router