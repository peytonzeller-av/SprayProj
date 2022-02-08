const Problem = require("../models/Problem");

exports.createProblem = async (req, res) => {
  try {
    console.log("saving...");
    const newProb = new Problem({ ...req.body, created: Date.now() });
    console.log(req.body);
    await newProb.save();
    res.status(200).send("success!");
  } catch (e) {
    console.log("error saving to db", e);
    res.status(500).send({ error: "error saving to db" });
  }
};

exports.updateProblem = async (req, res) => {
  try {
    console.log("updating problem...");
    const problem = await Problem.findByIdAndUpdate(
      req.body.key,
      req.body.problem
    );
    res.status(200).send("success!");
  } catch (e) {
    console.log("error updating problem", e);
    res.status(500).send({ error: "error updating problem" });
  }
};

exports.getAllProblems = async (req, res) => {
  try {
    console.log("getting all problems....");
    const problems = await Problem.find();
    res.status(200).send(problems);
  } catch (e) {
    console.log("error retrieving problems", e);
    res.status(500).send({ error: "error retrieving problems" });
  }
};

exports.deleteProblemById = async (req, res) => {
  try {
    console.log("req.body....", req.body);
    await Problem.deleteOne({ id: req.body.id });
    res.status(200).send("success!");
  } catch (e) {
    console.log("error deleting problems", e);
    res.status(500).send({ error: "error deleting problem" });
  }
};

exports.findProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    res.send({ data: problem });
    console.log("Finding Problem... ID: ", req.params.id);
  } catch {
    console.log("error finding problem", e);
    res.status(500).send({ error: "error finding problem" });
  }
};
