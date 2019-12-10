const router = require("express").Router()

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById
} = require("../controllers/users")

router
  .patch("/users/:userId", updateUser)
  .delete("/users/:userId", deleteUser)
  .get("/users", getUsers)
  .get("/users/:userId", getUserById)
  .get("/user", getUser) // if get user by token

module.exports = router
