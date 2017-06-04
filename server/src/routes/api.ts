const express = require('express');
const router = express.Router();
const listWord = require('../models/listWordModel');

router.get('/listWord', (req, res) => {
  listWord.find((err, words) => {
    if (err) {
      res.send(err);
    }
    res.json(words);
  });
});

router.post('/newWord', (req, res) => {
  let newWord = req.body.word;
  if (!newWord.foreignWord && !newWord.nativeWord) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    let word = new listWord({
      foreignWord: newWord.foreignWord ,
      nativeWord: newWord.nativeWord
    });

    word.save((err, word) => {
      if (err) {
        res.send(err);
      }
      res.json(word);
    });
  }
});

module.exports = router;