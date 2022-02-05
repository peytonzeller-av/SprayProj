const Problem = require("../models/Problem");

exports.createProblem = async (req, res) => {
  try {
    console.log("saving...");
    const newProb = new Problem({ ...req.body, created: Date.now() });
    console.log(req.body);
    await newProb.save();
    res.status(200).send({});
  } catch (e) {
    console.log("error saving to db", e);
  }
};

exports.getAllProblems = async (req, res) => {
  try {
    console.log("getting all problems....");
    const problems = await Problem.find();
    res.status(200).send(problems);
  } catch (e) {
    console.log("error retrieving problems", e);
    // todo res.send(500)
  }
};

exports.deleteProblemById = async (req, res) => {
  try {
    console.log("req.body....", req.body);
    await Problem.deleteOne({ id: req.body.id });
    res.status(200).send("success");
  } catch (e) {
    console.log("error deleting problems", e);
    // todo res.send(500)
  }
};

// TODO - Update Problem

// TODO - GET Problem By ID
