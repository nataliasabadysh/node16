const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGO_DB_URI_AIRBNB

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected...")
  })
  .catch(err => {
    if (err) {
      console.log("Database error: ", err.message)
      process.exit(1)
      process.kill(process.pid)
    }
  })

app.get("/", async (req, res, next) => {
  const UserSchema = await new mongoose.Schema({ name: String })

  const User = mongoose.model("Users", UserSchema, "user")

  const newUser = await new User({ name: "Jorik", age: 23 })

  console.log("newUser :", newUser)

  await newUser.save()

  const getUsers = await User.find({})

  res.json(getUsers)
})

app.get("/d", async (req, res, next) => {
  const MongoClient = require("mongodb").MongoClient
  const client = new MongoClient(mongoUri)

  try {
    await client.connect()
    const db = client.db("sample_airbnb")

    // Get the findAndModify collection
    const col = db.collection("listingsAndReviews")
    let r

    // Modify and return the modified document
    r = await col.find({}, { limit: 10 }).toArray()
    res.json(r)
    // assert.equal(1, r.value.b)
  } catch (err) {
    console.log(err.stack)
  }

  // Close connection
  client.close()
})

app.use((err, req, res) => {
  if (err) {
    console.log("err :", err)
    res.status(404).json({
      message: err.message
    })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
