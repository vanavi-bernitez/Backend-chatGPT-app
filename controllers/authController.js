import dotenv from "dotenv";

dotenv.config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const headers = {
      "PRIVATE-KEY": process.env.CHAT_ENGINE_SECRET_KEY,
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

    res.status(200).json({ response: chatEngineResponse.data });
    console.log("ok login");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error");
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
    console.log("ok sigup");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export { login, signup };
