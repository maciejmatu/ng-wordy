import WordModel, { Word } from '../models/wordModel';

export default class WordRepository {

  async find(): Promise<Word[]> {
    return await WordModel.find();
  }

  async updateOne(word): Promise<Word> {
    return await WordModel.findOneAndUpdate({id: word.id}, word, {new: true});
  }

  async removeOne(id) {
    const word: Word = await WordModel.findOne({id: id}, null, {limit: 1});
    word.remove();
  }

}
