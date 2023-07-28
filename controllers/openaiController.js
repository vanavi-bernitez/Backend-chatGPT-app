import dotenv from "dotenv";

import { openai } from "../index.js";

dotenv.config();

const headers = {
  "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
  "User-Name": process.env.CHAT_ENGINE_BOT_USERNAME,
  "User-Secret": process.env.CHAT_ENGINE_BOT_SECRET,
  "Content-Type": "application/json",
};

const text = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const openaiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
    });

    const chatEngineRequestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        text: openaiResponse.data.choices[0].message.content,
      }),
      redirect: "follow",
    };

    await fetch(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      chatEngineRequestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log("chat engine", result))
      .catch((error) => console.log("error posting to chat engine", error));

    res
      .status(200)
      .json({ text: openaiResponse.data.choices[0].message.content });
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

    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        text: response.data.choices[0].message.content,
      }),
      redirect: "follow",
    };

    await fetch(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log("chat engine", result))
      .catch((error) => console.log("error posting to chat engine", error));

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
};

const assist = async (req, res) => {
  try {
    const { text } = req.body;

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

export { text, code, assist };
