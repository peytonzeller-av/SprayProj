const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/problems", (req, res) => {
  res.send([{ key: 1, name: "Problem1", grade: 1 }]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
