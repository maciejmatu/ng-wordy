import { Document, Schema, model } from 'mongoose';

export interface Word extends Document {
  foreignWord: string,
  nativeWord: string,
  id: string
}

const WordSchema: Schema = new Schema({
  foreignWord: {
    type: String,
    required: true
  },
  nativeWord: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
}, { collection : 'words' });

export default model<Word>('Word', WordSchema);
