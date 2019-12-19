const Users = require("../../models/users.model")

module.exports = async (req, res) => {
  try {
    const credential = req.body

    const newUser = await new Users({
      ...credential
    })

    console.log("newUsers :", newUser)

    await newUser.generateAuthToken()

    const result = await newUser.save()

    res.json(result)
  } catch (error) {
    // Основні статус коди помилки
    // 400
    // 403
    // 404
    res.status(400).json(error)
  }
}
