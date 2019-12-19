const express = require("express");
const passport = require("passport");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
const mongodbUri = process.env.MONGO_DB_URI;
const routes = require("./routes");

require("./db/mongodb")(mongodbUri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect passport
app.use(passport.initialize());

// import passport strategy
require("./config/passport")(passport);

app.use("/", routes); // http://localhost:3000

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res) => {
  console.log("err :", err.message);
  res.send(err.message);
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
