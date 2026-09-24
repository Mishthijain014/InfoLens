const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateSummary = async (text) => {
  if (!text || !text.trim()) {
    throw new Error("Text is required for summarization");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",

    contents: `
You are a professional content summarization assistant.

Summarize the following content clearly and accurately.

Requirements:
- Keep the important information.
- Remove unnecessary repetition.
- Do not add information that is not present in the source.
- Use simple and clear language.
- Use short paragraphs or bullet points when useful.
- Keep the summary concise but informative.

CONTENT:

${text}
`
  });

  if (!response.text) {
    throw new Error("Gemini did not return a summary");
  }

  return response.text;
};

module.exports = {
  generateSummary
};