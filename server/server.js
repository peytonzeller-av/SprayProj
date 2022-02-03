const express = require("express");
const multer = require("multer");
const app = express();
const port = 5000;

const mockListProblems = [
  {
    key: "Steve's Problem",
    grade: 5,
    createdOn: "01-30-2022",
    sent: true,
    description: "First Problem Sent",
  },
  {
    key: "Pey's Problem",
    grade: 3,
    createdOn: "01-30-2022",
    sent: false,
    description: "Pey set",
  },
  {
    key: "Isaiah's Problem",
    grade: 5,
    createdOn: "01-30-2022",
    sent: true,
    description: "Isaiah Sent",
  },
  {
    key: "Carson's Problem",
    grade: 2,
    createdOn: "01-30-2022",
    sent: false,
    description: "Carson Sent",
  },
  {
    key: "Pinch!",
    grade: 8,
    createdOn: "01-30-2022",
    sent: true,
    description: "Cool Pinch Move",
  },
  {
    key: "Big Dyno",
    grade: 7,
    createdOn: "01-30-2022",
    sent: false,
    description: "Hard AF!",
  },
  {
    key: "Mystery Move",
    grade: 6,
    createdOn: "01-30-2022",
    sent: true,
    description: "What is this?",
  },
  {
    key: "Why not?",
    grade: 6,
    createdOn: "01-30-2022",
    sent: false,
    description: "Hey, why not",
  },
  {
    key: "Buddy's Run Memorial",
    grade: 4,
    createdOn: "01-30-2022",
    sent: true,
    description: "Classic!",
  },
  {
    key: "JBMP",
    grade: 3,
    createdOn: "01-30-2022",
    sent: false,
    description: "Gotta Do it!",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/problems", (req, res) => {
  console.log("Made it to problems ");
  res.status(200).send(mockListProblems);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

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
