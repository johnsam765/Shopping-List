const config = require("config")
const jwt = require("jsonwebtoken")

// For the middleware function we pass reqres and next . When we're done with one middleware, we call next()
// togo to the next middleware.
// Remember that the purpose of the middleware is to get the token from the react or postman
// or from any front-end we're gonna fetch it from the header.
function auth(req, res, next) {
    const token = req.header("x-auth-token")
        // Check for token
    if (!token) {
        return res.status(401).json({
            msg: "No Token, Authorization Denied!"
        })
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"))
            // Add user from payload
        console.log(decoded, "decoded")
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(400).json({
            msg: "Token is not valid"
        })
    }

}

module.exports = auth;