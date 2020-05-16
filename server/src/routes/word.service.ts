import { Word } from '../models/wordModel';

export const makeWordService = ({wordRepository}) => {

  const getWords = async (): Promise <Word[]> => {
    return await wordRepository.find();
  };

  const updatedWords = async (query): Promise <Word[]>  => {
    const updatedList = query;

    if (!Array.isArray(updatedList)) {
      throw new Error('Bad Data!');
    }

    const updateList = (): Promise <Word[]> => {
      return new Promise((resolve) => {

        updatedList.forEach(async(word, index) => {
          await wordRepository.updateOne(word);
          if (index === updatedList.length - 1) resolve(await wordRepository.find())
        });
      });
    };

    return updateList()

  };

  const deletedWords = async (query): Promise <Word[]>  => {
    const deleteList = query;

    if (!Array.isArray(deleteList)) {
      throw new Error('Bad Data!');
    }

    const removeList = (): Promise <Word[]> => {
      return new Promise((resolve) => {

        deleteList.forEach(async(id, index) => {
          wordRepository.removeOne(id);
          if (index === deleteList.length - 1) resolve(await wordRepository.find())
        });
      });
    };

    return removeList()

  };

  return {
    getWords,
    updatedWords,
    deletedWords
  }

};
