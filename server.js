const express = require("express");
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Lillu AI Backend is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.5",
      instructions: "You are Lillu AI. Reply naturally in the user's language.",
      input: message
    });

    res.json({ reply: response.output_text });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI response failed"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Lillu AI server running on port " + PORT);
});
