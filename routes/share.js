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

// Die restlichen Routen bleiben unverändert
// ...

module.exports = router;
