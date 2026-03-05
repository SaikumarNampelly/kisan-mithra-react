import { GoogleGenerativeAI } from "@google/generative-ai";

export default async ({ req, res, log, error }) => {
  try {
    log("Function started");

    let body;
    if (typeof req.body === "string") {
      try {
        body = JSON.parse(req.body);
      } catch (parseErr) {
        log("Failed to parse body: " + parseErr.message);
        return res.send(
          JSON.stringify({ success: false, error: "Invalid JSON body" }),
          200,
          { "Content-Type": "application/json" }
        );
      }
    } else {
      body = req.body;
    }

    if (!body || !body.audioBase64) {
      log("audioBase64 missing from request");
      return res.send(
        JSON.stringify({ success: false, error: "audioBase64 missing" }),
        200,
        { "Content-Type": "application/json" }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      error("GEMINI_API_KEY environment variable is not set");
      return res.send(
        JSON.stringify({ success: false, error: "API key not configured" }),
        200,
        { "Content-Type": "application/json" }
      );
    }

    log("Initializing Gemini AI");
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    log("Sending audio to Gemini for transcription");

    const result = await model.generateContent([
      "Transcribe this audio to English",
      {
        inlineData: {
          mimeType: "audio/webm",
          data: body.audioBase64
        }
      }
    ]);

    const text = result.response.text();

    log("Transcription successful: " + text.substring(0, 50));

    return res.send(
      JSON.stringify({
        success: true,
        transcriptEnglish: text
      }),
      200,
      { "Content-Type": "application/json" }
    );

  } catch (err) {
    error("Function error: " + err.message);
    error("Stack: " + err.stack);

    return res.send(
      JSON.stringify({
        success: false,
        error: err.message || "Unknown error occurred"
      }),
      200,
      { "Content-Type": "application/json" }
    );
  }
};