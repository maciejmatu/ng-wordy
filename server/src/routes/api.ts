import {Router, Request, Response} from 'express';
import WordModel, {Word} from '../models/wordModel';
import * as mongoose from 'mongoose';

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
        nativeWord: newWord.nativeWord,
        id: new mongoose.Types.ObjectId
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
        WordModel.update({'id': updatedList[i].id}, updatedList[i])
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

    function removeList(){
        return new Promise((resolve)=>{
            deleteList.forEach((id, index) => {
                WordModel.findOne({id: id}, null, {limit: 1})
                    .then((word: Word) => {
                        word.remove();
                        if(index == deleteList.length - 1) resolve()
                    })
                    .catch(err => res.send(err));
            });

        })
    }

    removeList().then(() => {
        WordModel.find()
            .then((words: Word[]) => res.json(words))
            .catch(err => res.send(err))
    });

});

export default router;