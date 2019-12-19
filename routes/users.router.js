const router = require("express").Router()
const authCheck = require("../middlewares/authCheck")

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById
} = require("../controllers/users")

router
  .patch("/users", authCheck, updateUser)
  .delete("/users/:userId", authCheck, deleteUser)
  .get("/users", authCheck, getUsers)
  .get("/users/:userId", getUserById)
  .get("/user", getUser) // if get user by token

module.exports = router
