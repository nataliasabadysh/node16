const express = require("express");
const app = express();
const darkskyApi = require("./utils/darkskyApi");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");

app.use(express.static("static"));

app.get("/", (req, res) => {
  // логіка на обробку

  res.status(302).redirect("/weather");
});

// app.get("/:latitude/:longitude", (req, res) => {
//   const { latitude, longitude } = req.params;
//   darkskyApi();
//   res.render("index", { title: "WeatherApp" });
// });

app.get("/weather", async (req, res) => {
  const { lat, lan } = req.query;

  if (lat && lan) {
    const getWeather = await darkskyApi(lat, lan);
    console.log("getWeather :", getWeather);
    return res.render("weather", { title: "WeatherApp", ...getWeather });
  }

  res.render("index", { title: "WeatherApp" });
  // console.log("getWeather :", getWeather);
});

app.get("/api/location", async (req, res) => {
  const { lat, lan } = req.query;

  if (lat && lan) {
    const getWeather = await darkskyApi(lat, lan);
    return res.json(getWeather);
  }

  res.status(400).json({ message: "not data lat, lan" });
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
