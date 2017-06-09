import {Router, Request, Response} from 'express';
import WordModel, {Word} from '../models/wordModel';

const router: Router = Router();

router.get('/word/list', (req: Request, res: Response) => {
    WordModel.find()
        .then((words: Word[]) => res.json(words))
        .catch(err => res.send(err));
});

router.post('/word/add', (req: Request, res: Response) => {
    let newWord = req.body.word;

    if (!newWord.foreignWord && !newWord.nativeWord) {
        return res.status(400).json({'error': 'Bad Data'});
    }

    let word = new WordModel({
        foreignWord: newWord.foreignWord,
        nativeWord: newWord.nativeWord
    });

    word.save()
        .then((word: Word) => res.json(word))
        .catch(err => res.send(err));
});

router.put('/word/list', (req: Request, res: Response) => {
    let updatedList = req.body.list;

    if (!Array.isArray(updatedList)) {
        return res.status(400).json({'error': 'Bad Data'});
    }

    for (let i = 0; i < updatedList.length; i++) {
        WordModel.update({'_id': updatedList[i].id}, updatedList[i])
            .catch(err => res.send(err));
    }

    WordModel.find()
        .then((words: Word[]) => res.json(words))
        .catch(err => res.send(err));
});

router.delete('/word/list', (req: Request, res: Response) => {
    let deleteList = req.body.list;

    if (!Array.isArray(deleteList)) {
        return res.status(400).json({'error': 'Bad Data'});
    }

    for (let i = 0; i < deleteList.length; i++) {
        WordModel.findById(deleteList[i].id)
            .then((word: Word) => word.remove())
            .catch(err => res.send(err))
    }

    WordModel.find()
        .then((words: Word[]) => res.json(words))
        .catch(err => res.send(err));
});

export default router;