const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY

function token(pl) {
    return jwt.sign(pl, secretKey)
}

function verifyToken(token) {
    return jwt.verify(token, secretKey)
}

module.exports = { token, verifyToken }