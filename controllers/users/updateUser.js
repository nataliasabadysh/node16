const Users = require("../../models/users.model")

module.exports = async (req, res) => {
  const user = req.user
  const body = req.body

  try {
    //? Заміна паролю користувача і автоматичний запуск пер методу монгуса на "save"
    // user.password = req.body.password
    // const updatedUser = await user.save()

    // //? Якщо у цьому випадку буде заміна паролю у нас спацбює на
    // //? цей метод 'findByIdAndUpdate' пре метод монгуса на зміну пароля
    // const updatedUser = await Users.findByIdAndUpdate(
    //   user._id,
    //   {
    //     $set: { ...body }
    //   },
    //   { new: true }
    // )

    // const updatedUser = await Users.findOneAndUpdate(
    //   { _id: user._id },
    //   {
    //     $set: { ...body }
    //   },
    //   { new: true }
    // )

    const getUser = await Users.findOne({ _id: user._id })

    for (let key in body) {
      getUser[key] = body[key]
    }

    const updatedUser = await getUser.save()
    // if (!updatedUser) {
    //   return res.status(404).json({
    //     message: "User exist"
    //   })
    // }
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json(error)
  }
}
