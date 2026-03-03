export default async ({ req, res }) => {
  console.log("🔥 TRANSCRIBE FUNCTION IS RUNNING");

  res.json({
    success: true,
    transcriptEnglish: "Test working",
  });
};