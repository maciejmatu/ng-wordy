import { Router, Request, Response } from 'express';
import WordModel, { Word } from '../models/wordModel';
import * as mongoose from 'mongoose';
import { makeWordService } from './word.service';
import WordRepository from './word.repository';
import { wordsAPI } from './word.api';

const router: Router = Router();

const WordService = makeWordService({
  wordRepository: new WordRepository()
});

const api = wordsAPI({WordService});

router.route('/word/list')
  .get(api.getWords)
  .put(api.updatedWords)
  .delete(api.deletedWords);

router.route('/word/add')
  .post(async (req: Request, res: Response) => {
  const newWord = req.body.word;

  if (!newWord.foreignWord && !newWord.nativeWord) {
    return res.status(400).json({'error': 'Bad Data'});
  }

  const word = new WordModel({
    foreignWord: newWord.foreignWord,
    nativeWord: newWord.nativeWord,
    id: new mongoose.Types.ObjectId
  });

  try {
    const saved: Word = await word.save();

    res.json(saved);
  } catch(err) {
    res.send(err);
  }
});

router.route('/word/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const foundWord: Word = await WordModel.findOne({id: req.params.id});

      if (!foundWord) return res.json({'message': 'No word found'});

      res.json(foundWord);
    } catch(err) {
      res.send(err);
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const updated: Word = await WordModel.findOneAndUpdate({id: req.params.id}, req.body.word, {new: true});

      if (!updated) return res.json({'message': 'No word found'});

      res.json(updated);
    } catch(err) {
      res.send(err);
    }
  })
  .delete(async (req: Request, res: Response) => {
    try {
      const deleted: Word = await WordModel.findOneAndRemove({id: req.params.id});

      if (!deleted) return res.json({'message': 'No word found'});

      res.json(deleted);
    } catch(err) {
      res.send(err);
    }
  });

export default router;
