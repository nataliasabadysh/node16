const Users = require("../../models/users.model")

module.exports = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await Users.findOne({ _id: userId })
    res.json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}
