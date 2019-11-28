const express = require("express")
const app = express()
const path = require("path")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const port = process.env.PORT || 5000

// Підключаємо парсери для application/json і application/x-www-form-urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Приклад middelware
// app.use(function(req, res, next) {
//   console.log("headers: ", req.headers)
//   next()
// })

//! send index.html to client
//? @GET /
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "static", "index.html"))
})

//* ----------------------------------
// app.use("/", (req, res) => {
//   //! Квері параметри - QueryString - Query - Search
//   // const query = req.query
//   // console.log("query :", query)
//   // res.send("Heee. Name - " + query.name)

//   //! JSON - application/json
//   const body = req.body
//   console.log("body :", body)
//   res.json(body)
// })

//* ----------------------------------
// //? baseUrl = localhost
// //? protocol = http
// //? port = 5000
// //? @GET /app?is=fgff
// //! http://localhost:5000/app?is=ffaf
// app.get(
//   "/app",
//   (req, res, next) => {
//     const { is } = req.query

//     console.log("is :", is)

//     if (is) {
//       next()
//     } else {
//       res.json({
//         message: "Add please query is=true"
//       })
//     }
//   },
//   (req, res) => {
//     res.json({
//       message: `Salute, is=${req.query.is}`
//     })
//   }
// )

// //* ----------------------------------
// //? @POST http://localhost:5000/
// //! content-type: multipart/form-data

// app.post("/", upload.single("file"), (req, res) => {
//   res.json({
//     body: req.body,
//     file: req.file
//   })
// })

//* ---------------------------------
//! use params and return some images by imageName
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName
  const options = {
    root: path.resolve(__dirname, "uploads"),
    dotfiles: "deny",
    headers: {
      "Content-Type": "image/jpeg",
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  }
  res.sendFile(imageName, options)
})

//* ---------------------------------
//! Send from form-data image and save image on backend and return this image to client
app.post("/", upload.single("file"), (req, res) => {
  // console.log("req.file.path :", req.file.path)
  const options = {
    root: path.resolve(__dirname, "uploads"),
    dotfiles: "deny",
    headers: {
      "Content-Type": "image/jpeg",
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  }
  res.sendFile(req.file.filename, options)
})

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
