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
