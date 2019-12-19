const Users = require("../../models/users.model")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = async (req, res) => {
  try {
    const user = await Users.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          password: 0
        }
      },
      {
        $addFields: {
          "newFiels.object": "fds",
          "newFiels.object2": "fds"
        }
      },
      {
        $sort: {
          name: -1
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          "newFiels.object": 1,
          "newFiels.object2": "fdffffff"
        }
      }
      // {
      //   $group: {
      //     _id: "$tasks",
      //     docs: { $push: "$$ROOT" }
      //   }
      // }
    ])

    res.json(user)
  } catch (error) {
    res.json(error)
  }
}
