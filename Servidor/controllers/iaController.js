const iaService = require('../services/iaService.js');

exports.getResponse = async (req, res) => {
  try {
    const userMessage = req.body.message || "";
    const iaReply = await iaService.getIAResponse(userMessage);
    res.json({ reply: iaReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error en el servidor de IA." });
  }
};
