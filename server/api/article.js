var express = require('express');
var router = express.Router();
var Article = require('../models/article');
const uuidV1 = require('uuid/v1');
const passport = require('passport');
require('../../util/util');
require('../passport')(passport);

/**
 * 后台接口
 */
// 文章列表
router.get('/list', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let username = req.session.YYJ_username
  
  if (!username || username === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }

  Article.find({username: username}, (err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      });
    } else {
      if (doc) {
        var arr = [];
        doc.forEach((item, index) => {
          arr.push({
            id: item.articleId,
            time: item.createTime,
            title: item.articleTitle
          });
        });
        res.json({
          code: 200,
          msg: '',
          data: arr
        });
      }
    }
  })
})
// 查询单个文章
router.get('/singleArticle', (req, res, next) => {
  var articleId = req.query.articleId;

  Article.findOne({ articleId: articleId }, (err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      });
    } else {
      var obj = {
        title: doc.articleTitle,
        time: doc.createTime,
        content: doc.articleContent
      };
      if (doc) {
        res.json({
          code: 200,
          msg: '',
          data: obj
        });
      }
    }
  })
})
// 新增文章
router.post('/increaseArticle', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let articleTitle = req.body.articleTitle
  let articleContent = req.body.articleContent
  let username = req.session.YYJ_username
  let createTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
  let articleId = uuidV1() // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

  if (!username || username === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }
  
  var article = new Article({
    articleTitle: articleTitle,
    articleContent: articleContent,
    articleId: articleId,
    createTime: createTime,
    username: username
  });

  article.save((err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      });
    } else {
      res.json({
        code: 200,
        msg: '添加成功!',
        data: ''
      });
    }
  });
})
// 删除文章
router.post('/deleteArticle', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let articleId = req.body.articleId
  let username = req.session.YYJ_username

  if (!username || username === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }

  Article.remove({ username: username, articleId: articleId }, (err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      })
    } else {
      res.json({
        code: 200,
        msg: '删除成功！',
        data: ''
      })
    }
  })
})
// 修改文章
router.post('/updateArticle', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let articleId = req.body.articleId
  let articleTitle = req.body.articleTitle
  let articleContent = req.body.articleContent
  let username = req.session.YYJ_username

  if (!username || username === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }

  var conditions = { username: username, articleId: articleId }
  var update = { $set: { articleTitle: articleTitle, articleContent: articleContent } }
  var options = {}
  Article.update(conditions, update, options, function (err, doc) {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      });
    } else {
      res.json({
        code: 200,
        msg: '更新成功！',
        data: ''
      })
    }
  })
})

/**
 * 前台接口
 */
// 文章列表
router.get('/listF', (req, res, next) => {
  Article.find({}, (err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      });
    } else {
      if (doc) {
        var arr = [];
        doc.forEach((item, index) => {
          arr.push({
            id: item.articleId,
            time: item.createTime,
            title: item.articleTitle,
            content: item.articleContent.substring(0, 50)
          });
        });
        res.json({
          code: 200,
          msg: '',
          data: arr
        });
      }
    }
  })
});

module.exports = router;
