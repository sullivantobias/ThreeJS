const express = require("express"),
  path = require("path"),
  app = express();

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/basic-shape", (req, res) => {
  res.redirect("/examples/basicCube.html");
})
.get("/solar-system", (req, res) => {
    res.redirect("/examples/solarSystem.html");
})
.get("/basic-sphere", (req, res) => {
    res.redirect("/examples/basicSphere.html");
})

app.listen(8080);
