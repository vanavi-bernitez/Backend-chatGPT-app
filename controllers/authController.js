import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const headers = {
      "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
      "User-Name": username,
      "User-Secret": password,
      "Content-Type": "application/json",
    };

    const chatEngineRequestOptions = {
      method: "GET",
      headers,
      redirect: "follow",
    };

    const chatEngineResponse = await fetch(
      "https://api.chatengine.io/users/me/",
      chatEngineRequestOptions
    );

    const data = await chatEngineResponse.json();
    console.log(data);
    res.status(200).json({ response: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error", error);
  }
};

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const headers = {
      "PRIVATE-KEY": process.env.CHAT_ENGINE_SECRET_KEY,
      "Content-Type": "application/json",
    };

    const chatEngineRequestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify({
        username,
        secret: password,
      }),
      redirect: "follow",
    };

    const chatEngineResponse = await fetch(
      "https://api.chatengine.io/users/",
      chatEngineRequestOptions
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export { login, signup };
