const mongoose = require("mongoose")
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    avatar: {
      type: String
    },
    location: {
      lat: {
        type: Number
      },
      lad: {
        type: Number
      }
    },
    token: String,
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tasks"
      }
    ]
  },
  { timestamps: true }
)

// userSchema.virtual("tasks", {
//   ref: "Tasks",
//   localField: "_id",
//   foreignField: "owner"
// })

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  )

  user.token = token
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email })

  if (!user) {
    throw new Error("Unable to login")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Unable to login")
  }

  return user
}

// Hash the plain text password before saving
userSchema.pre("save", async function(next) {
  const user = this

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

// Delete user tasks when user is removed
userSchema.pre("remove", async function(next) {
  const user = this
  await Tasks.deleteMany({ owner: user._id })
  next()
})

module.exports = Users = mongoose.model("Users", userSchema)
