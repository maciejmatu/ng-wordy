import { Request, Response } from 'express';
import { Word } from '../models/wordModel';

export const wordsAPI = ({ WordService }) => {
  return {
    getWords: async (req: Request, res: Response) => {
      try {
        const foundList: Word[] = await WordService.getWords();
        res.json(foundList);
      } catch(err) {
        res.send(err);
      }
    },
    updatedWords: async (req: Request, res: Response) => {
      try {
        const foundList: Word[] = await WordService.updatedWords(req.body.list);
        res.json(foundList);
      } catch(err) {
        res.send(err);
      }
    },
    deletedWords: async (req: Request, res: Response) => {
      try {
        const foundList: Word[] = await WordService.deletedWords(req.body.list);
        res.json(foundList);
      } catch(err) {
        res.send(err);
      }
    }
  }
};
