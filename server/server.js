const express = require("express");
const multer = require("multer");
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

// Upload Image
const upload = multer({ dest: "uploads/" });
app.post("/uploadProblem", upload.single("uploaded_problem"), function (req, res) {
  console.log(req.file, req.body);
  res.sendStatus(200);
});
