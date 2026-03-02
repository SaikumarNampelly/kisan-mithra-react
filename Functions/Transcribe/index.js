import fetch from "node-fetch";

export default async ({ req, res, log, error }) => {
  try {
    const body = JSON.parse(req.body || "{}");
    const { audioBase64 } = body;

    if (!audioBase64) {
      return res.json({ success: false, error: "No audio provided" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.json({ success: false, error: "Missing Gemini API key" });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "audio/wav",
                    data: audioBase64,
                  },
                },
                {
                  text: "Transcribe this audio and translate to English only.",
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiResponse.json();
    log(JSON.stringify(geminiData));

    const transcript =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!transcript) {
      return res.json({
        success: false,
        error: "Gemini did not return transcript",
      });
    }

    return res.json({
      success: true,
      transcriptEnglish: transcript,
    });
  } catch (err) {
    error(err.message);
    return res.json({
      success: false,
      error: err.message,
    });
  }
};