import { Schema, model } from 'mongoose'

const WordSchema = new Schema({
    foreignWord: String,
    nativeWord: String
},{ collection : 'words' });

export default model('Word', WordSchema);