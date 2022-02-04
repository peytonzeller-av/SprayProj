const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Problem = require("./models/Problem");
const problemController = require("./controllers/problems");
const app = express();
const port = 5000;

// middleware
app.use(bodyParser.json());

app.post("/create", problemController.createProblem);
app.get("/problems", problemController.getAllProblems);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect("mongodb://localhost:27017/sprayproj-db").then(
  () => {
    console.log("DB Connection Successful");
  },
  (err) => {
    console.log("DB Connection Unsuccessful");
  }
);

// TODO - Finish (YT Tutorial Helps)
// Upload Image
// const upload = multer({ dest: "uploads/" });
// app.post("/uploadProblem", upload.single("uploaded_problem"), async (req, res) => {
//   console.log(req.file, req.body);
//   const file = req.file
//   console.log(file)

//   // apply filter
//   // resize

//   const result = await uploadFile(file)
//   await unlinkFile(file.path)
//   console.log(result)
//   const description = req.body.description
//   res.send({imagePath: `/images/${result.Key}`})
//   res.sendStatus(200);
// });
