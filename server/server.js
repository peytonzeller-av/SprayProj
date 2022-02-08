const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Problem = require("./models/Problem");
const problemController = require("./controllers/problems");
const { uploadFile, getFileStream } = require("./s3");
const app = express();
const port = 5000;

// middleware
app.use(bodyParser.json());

app.post("/create", problemController.createProblem);
app.get("/problems", problemController.getAllProblems);
app.delete("/delete", problemController.deleteProblemById);
app.post("/update", problemController.updateProblem);
app.post("/getById", problemController.findProblemById);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// TODO - move to controller
const upload = multer({ dest: "uploads/" });
app.post(
  "/image",
  upload.single("uploaded_problem_image"),
  async (req, res) => {
    try {
      console.log("Uploading image...");
      const file = req.file;
      await uploadFile(file);
      res.status(200).send("success uploading image");
    } catch (e) {
      console.log("error uplaoding image ", e);
    }
  }
);

app.get("/image/:key", (req, res) => {
  console.log("req ", req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

mongoose.connect("mongodb://localhost:27017/sprayproj-db").then(
  () => {
    console.log("DB Connection Successful");
  },
  (err) => {
    console.log("DB Connection Unsuccessful");
  }
);
