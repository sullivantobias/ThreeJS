const express = require("express"),
  path = require("path"),
  app = express();

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/examples/solarSystem.html");
})

app.listen(8080);
