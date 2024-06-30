const express = require('express');
const router = express.Router();
const Prompt = require('../models/prompt');

// Route zum Erstellen und Teilen eines neuen Prompts
router.post('/new', async (req, res) => {
  const {
    name,
    text,
    folder,
    color,
    variables,
    final,
    version,
    previousVersions
  } = req.body;

  if (!name || !text || !folder || !color || !variables || final === undefined || !version) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const prompt = new Prompt({
      name,
      text,
      folder,
      color,
      variables,
      final,
      version,
      previousVersions
    });
    await prompt.save();

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
