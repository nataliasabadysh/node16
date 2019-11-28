const http = require("http")
const port = 3000
const qs = require("querystring")
const url = require("url")

const server = http.createServer(function(req, res) {
  console.log("req.method :", req.method)
  console.log("req.url :", req.url)
  const myURL = url.parse(req.url)

  if (req.method === "GET" && req.url === "/favicon.ico") {
    res.setStatusCode = 404
    res.end()
  }

  if (req.method === "GET" && myURL.pathname === "/") {
    res.setHeader("Content-Type", "text/html")
    res.write(
      '<form method="GET" action="/form"><input type="text" name="name" /><input type="text" name="dog" /><button type"submit">Send</button></form> '
    )
    res.end()
  }

  if (req.method === "GET" && myURL.pathname === "/form") {
    const query = qs.parse(myURL.query)
    console.log("parsedQuery :", query)

    res.write("<h1>Dog name: " + query.name + ". What " + query.dog + "</h1>")
    res.end()
  }
})

server.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err)
  }
  console.log(`server is listening on ${port}`)
})
