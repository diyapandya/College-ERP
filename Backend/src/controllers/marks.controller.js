const Academic = require("../models/academic.model");

exports.submitMarks = async (req, res) => {
  const { studentId, subject, internalMarks, universityMarks } = req.body;

  const total = internalMarks + universityMarks;

  const health =
    total >= 80 ? 90 :
    total >= 60 ? 70 :
    total >= 40 ? 50 : 25;

  const eligibility = internalMarks >= 20 ? "Eligible" : "Not Eligible";
  const risk = total < 40;

  await Academic.findOneAndUpdate(
    { studentId, subject },
    {
      internalMarks,
      universityMarks,
      academicHealth: health,
      eligibilityStatus: eligibility,
      riskFlag: risk
    },
    { upsert: true, new: true }
  );

  res.json({ message: "Marks saved & academic health auto-updated" });
};
