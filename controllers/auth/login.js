const Users = require("../../models/users.model")

module.exports = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await Users.findByCredentials(email, password)
    console.log("user :", user)
    res.json(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
