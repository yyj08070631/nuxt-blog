let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    "articleId": String,
    "createTime": String,
    "articleTitle": String,
    "articleContent": String,
    "username": String
});

module.exports = mongoose.model('Articles', articleSchema, 'articles');