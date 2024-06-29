const express = require('express');
const router = express.Router();
const Prompt = require('../models/prompt');

// Route zum Teilen eines Prompts
router.post('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Suchen nach dem Prompt mit dem spezifischen promptId anstatt der MongoDB ObjectId
    const prompt = await Prompt.findOne({ promptId: id });
    if (!prompt) {
      return res.status(404).json({ error: 'Prompt not found' });
    }

    const shareId = Math.random().toString(36).substring(2, 15);
    prompt.shareId = shareId;
    await prompt.save();

    res.json({ shareUrl: `https://pixelrakete.onrender.com/api/share/${shareId}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route zum Abrufen eines geteilten Prompts
router.get('/:shareId', async (req, res) => {
  const { shareId } = req.params;
  try {
    const prompt = await Prompt.findOne({ shareId });
    if (!prompt) {
      return res.status(404).json({ error: 'Shared prompt not found' });
    }

    res.json({ prompt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
