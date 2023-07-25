const text = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log(text);
    res.status(200).json({ text });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: error.message });
  }
};

export { text };
