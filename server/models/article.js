let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
  articleId: Number,
  createTime: String,
  articleTitle: String,
  articleContent: String,
  username: String,
  viewNum: Number,
  likeNum: Number,
  comment: [{
    commentatorName: String,
    email: String,
    website: String
  }]
});

module.exports = mongoose.model('Articles', articleSchema, 'articles');