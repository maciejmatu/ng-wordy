const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    foreignWord: String,
    nativeWord: String
},{ collection : 'listWord' });

module.exports = mongoose.model('listWord', WordSchema);