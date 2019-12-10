const router = require("express").Router()

const { login, register } = require("../controllers/auth")
router
  .post("/login", login) // http://localhost:3000/auth/login
  .post("/register", register) // http://localhost:3000/auth/register

module.exports = router
