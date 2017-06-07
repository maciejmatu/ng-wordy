import { Router, Request, Response } from 'express';
import WordModel, { Word } from '../models/wordModel';

const router: Router = Router();

router.get('/word/list', (req: Request, res: Response) => {
  WordModel.find((err, words: Word[]) => {
    if (err) res.send(err);

    res.json(words);
  });
});

router.post('/word/add', (req: Request, res: Response) => {
  let newWord = req.body.word;

  if (!newWord.foreignWord && !newWord.nativeWord) {
    res.status(400);
    res.json({ "error": "Bad Data" });
  } else {
    let word = new WordModel({
      foreignWord: newWord.foreignWord,
      nativeWord: newWord.nativeWord
    });

    word.save((err, word: Word) => {
      if (err) res.send(err);

      res.json(word);
    });
  }
});

export default router;