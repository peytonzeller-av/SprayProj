const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Problem = require("./models/Problem");
const problemController = require("./controllers/problems");
const { uploadFile, getFileStream } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const app = express();
const port = 5000;

// middleware
app.use(bodyParser.json());

app.post("/create", problemController.createProblem);
app.get("/problems", problemController.getAllProblems);
app.delete("/delete", problemController.deleteProblemById);
app.put("/update", problemController.updateProblem);
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
      const file = req.file;
      console.log("uploading file to s3.... ", file);
      await uploadFile(file);
      console.log("deleting file from express server...")
      await unlinkFile(file.path);
      res.status(200).send({ data: file.filename });
    } catch (e) {
      console.log("error uplaoding image ", e);
    }
  }
);

app.get("/image/:key", (req, res) => {
  const key = req.params.key;
  console.log("req key", req.params.key);
  const readStream = getFileStream(key);

  console.log("piping s3 image response to server....");
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
