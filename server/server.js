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
      const file = req.file;
      console.log("file, ", file);
      const result = await uploadFile(file);
      console.log("-------------", file);

      // res.status(200).send({ data: file.filename });
      res.send({ imagePath: `/images/${result.Key}` });
    } catch (e) {
      console.log("error uplaoding image ", e);
    }
  }
);

app.get("/image/:key", (req, res) => {
  const key = req.params.key;
  console.log("req key", req.params.key);
  const readStream = getFileStream(key);

  console.log("piping....");
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
