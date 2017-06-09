import { Router } from 'express';
import Word from '../models/wordModel';

const router = Router();

router.get('/word/list', (req, res) => {
  Word.find((err, words) => {
    if (err) res.send(err);

    res.json(words);
  });
});

router.post('/word/add', (req, res) => {
  let newWord = req.body.word;

  if (!newWord.foreignWord && !newWord.nativeWord) {
    res.status(400);
    res.json({ "error": "Bad Data" });
  } else {
    let word = new Word({
      foreignWord: newWord.foreignWord,
      nativeWord: newWord.nativeWord
    });

    word.save((err, word) => {
      if (err) res.send(err);

      res.json(word);
    });
  }
});

export default router;