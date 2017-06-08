import { Router, Request, Response } from 'express';
import WordModel, { Word } from '../models/wordModel';

const router: Router = Router();

router.get('/word/list', (req: Request, res: Response) => {
  WordModel.find()
    .then((words: Word[]) => res.json(words))
    .catch(err => res.send(err));
});

router.post('/word/add', (req: Request, res: Response) => {
  let newWord = req.body.word;

  if (!newWord.foreignWord && !newWord.nativeWord) {
    return res.status(400).json({ "error": "Bad Data" });
  }

  let word = new WordModel({
    foreignWord: newWord.foreignWord,
    nativeWord: newWord.nativeWord
  });

  word.save()
    .then((word: Word) => res.json(word))
    .catch(err => res.send(err));
});

export default router;