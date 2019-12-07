const express = require("express");
const path = require("path");

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, "dist/search-address/")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/search-address/index.html"));
});

app.listen(process.env.PORT || 8080);
