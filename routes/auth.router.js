const passport = require("passport");
const router = require("express").Router();

const { login, register } = require("../controllers/auth");

router
  .post("/login", login) // http://localhost:3000/auth/login
  .post("/register", register) // http://localhost:3000/auth/register
  .get("/facebook", passport.authenticate("facebook"))
  .get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      const user = req.user;
      console.log("user :", user);
      // Successful authentication, redirect home.
      res.json(user);
    }
  )
  .get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email", "openid"]
    })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
      const user = req.user;
      // Successful authentication, redirect home.
      res.json(user);
    }
  );
module.exports = router;
