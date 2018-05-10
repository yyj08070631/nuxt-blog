let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
  createTime: { type: Number, default: new Date().getTime() },
  articleTitle: { type: String, default: '' },
  articleContent: { type: String, default: '' },
  userId: { type: String, default: '' },
  viewNum: { type: Number, default: 0 },
  likeNum: { type: Number, default: 0 },
  comment: [{
    name: { type: String, require: true },
    content: { type: String, require: true },
    email: String,
    website: String,
    ip: String
  }]
}, {
  versionKey: false
})

module.exports = mongoose.model('Articles', articleSchema, 'articles')