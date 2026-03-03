module.exports = async function (req, res) {
  console.log("🔥 FUNCTION EXECUTED");

  res.json({
    success: true,
    transcriptEnglish: "Test working",
  });
};