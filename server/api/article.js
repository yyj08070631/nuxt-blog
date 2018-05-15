var express = require('express')
var router = express.Router()
var Article = require('../models/article')
// const uuidV1 = require('uuid/v1')
const passport = require('passport')
const ObjectId = require("bson-objectid")
require('../passport')(passport)

// ------------------------------------------ 复用 ------------------------------------------
// 文章列表
router.get('/list', (req, res, next) => {
  let userId = req.session.YYJ_userId
  
  if (!userId || userId === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }

  Article.find({ userId: userId }, (err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      })
    } else {
      if (doc) {
        res.json({
          code: 200,
          msg: '',
          data: doc
        })
      }
    }
  })
})
// 查询单个文章
router.get('/singleArticle', (req, res, next) => {
  let articleId = req.query.articleId

  Article.findOne({ _id: ObjectId(articleId) }, (err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      })
    } else {
      if (doc) {
        res.json({
          code: 200,
          msg: '',
          data: doc
        })
      }
    }
  })
})

// ------------------------------------------ 后台 ------------------------------------------
// 新增文章
router.post('/increaseArticle', passport.authenticate('bearer', { session: false }), (req, res, next) => {
  let articleTitle = req.body.articleTitle
  let articleContent = req.body.articleContent
  let userId = req.session.YYJ_userId

  if (!userId || userId === '') {
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
    userId: userId
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
  let userId = req.session.YYJ_userId

  if (!userId || userId === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }

  Article.remove({ userId: userId, _id: ObjectId(articleId) }, (err, doc) => {
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
  let userId = req.session.YYJ_userId

  if (!userId || userId === '') {
    res.json({
      code: 202,
      msg: '用户未登录',
      data: ''
    })
    return
  }

  let conditions = { userId: userId, _id: ObjectId(articleId) }
  let update = { $set: { articleTitle: articleTitle, articleContent: articleContent } }
  let options = {}
  Article.update(conditions, update, options, (err, doc) => {
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

// ------------------------------------------ 客户端 ------------------------------------------
// 文章列表
router.get('/listAll', (req, res, next) => {
  Article.find((err, doc) => {
    if (err) {
      res.json({
        code: 201,
        msg: err.message,
        data: ''
      })
    } else {
      if (doc) {
        res.json({
          code: 200,
          msg: '',
          data: doc
        })
      }
    }
  })
})

module.exports = router
