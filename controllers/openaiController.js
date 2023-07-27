import { openai } from "../index.js";

const text = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: text}],
    });
    console.log(text)
    console.log(response.data.choices[0].message);
    res.status(200).json({ text });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
};

const code = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant coder who responds with only code and no explanations.",
        },
        { role: "user", content: text },
      ],
    });

    console.log(text, response);
    res.status(200).json({ text });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
};

const assist = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        },
        { role: "user", content: `Finish my thought: ${text}` },
      ],
    });

    console.log(text, response);
    res.status(200).json({ text });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
};

export { text };
