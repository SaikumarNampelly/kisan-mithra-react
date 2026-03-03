module.exports = async function (req, res) {
  console.log("🔥 FUNCTION IS RUNNING");

  res.json({
    success: true,
    transcriptEnglish: "Test working",
  });
};