const jwt = require("jsonwebtoken")
const Users = require("../models/users.model")
require("dotenv").config()

function getTokenFromAuthHeader(headers) {
  let token = null

  if (headers.authorization) {
    // беремо ключ authorization з request Headers
    const getAuthValue = headers.authorization.split(" ")

    // перевіряємо на потрібен нам токен
    if (getAuthValue[0] === "Bearer")
      token = headers.authorization.split(" ")[1]
  }

  return token
}

async function authCheck(req, res, next) {
  try {
    const headers = req.headers
    const jwtOptions = {
      jwtSecretKey: process.env.JWT_SECRET_KEY || "if not work env"
    }

    const token = getTokenFromAuthHeader(headers)

    if (token) {
      // console.log("jwtSecret :", jwtOptions.jwtSecretKey)
      const validToken = await jwt.verify(token, jwtOptions.jwtSecretKey)

      // console.log("validToken :", validToken)
      if (validToken) {
        const user = await Users.findById(validToken.id)
        if (!user) {
          req.user = null
          return next()
        }
        // console.log("user :", user)
        if (user) {
          req.user = user
          return next()
        }
      }
    }

    res.status(401).json({
      message: "Unauthorized"
    })
  } catch (error) {
    if (error.message === "invalid signature") {
      // res.status(401).send("Unauthorized")

      res.status(401).json({
        message: "Unauthorized"
      })
    }
  }
}

module.exports = authCheck
