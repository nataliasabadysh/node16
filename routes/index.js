const router = require("express").Router()
const imagesRouter = require("./images.router")
const usersRouter = require("./users.router")
const authRouter = require("./auth.router")

router
  .use("/auth", authRouter) // http://localhost:3000/auth
  .use(usersRouter) // http://localhost:3000
  .use("/images", imagesRouter) // http://localhost:3000/images

module.exports = router
