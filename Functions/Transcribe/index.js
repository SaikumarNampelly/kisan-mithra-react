const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async ({ req, res, log, error }) => {
  try {
    log("Function started");

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!body.audioBase64) {
      return res.json({ success: false, error: "audioBase64 missing" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      error("GEMINI_API_KEY missing");
      return res.json({ success: false, error: "API key missing" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    log("Sending audio to Gemini");

    const result = await model.generateContent([
      "Transcribe this audio to English",
      {
        inlineData: {
          mimeType: "audio/wav",
          data: body.audioBase64
        }
      }
    ]);

    const text = result.response.text();

    log("Transcript: " + text);

    return res.json({
      success: true,
      transcriptEnglish: text
    });

  } catch (err) {
    error("Function crash: " + err.message);

    return res.json({
      success: false,
      error: err.message
    });
  }
};