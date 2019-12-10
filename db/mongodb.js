const mongoose = require("mongoose")

module.exports = async mongodbUri => {
  try {
    const connectToDb = await mongoose.connect(mongodbUri, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    if (connectToDb) {
      console.log("DB Connected...")
    }
  } catch (error) {
    console.log("Some false")
    process.exit(1)
  }
}
