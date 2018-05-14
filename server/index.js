const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan') // 命令行log显示
const passport = require('passport') // 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy // token验证模块
const session = require('express-session')
import { Nuxt, Builder } from 'nuxt'
const pconfig = require('../publish-config').default

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/blog')
mongoose.connection.on('connected', function () { console.log('mongodb connected success') })
mongoose.connection.on('error', function () { console.log('mongodb connected fail') })
mongoose.connection.on('disconnected', function () { console.log('mongodb connected disconnected') })

const index = require('./api/index')
const users = require('./api/users')
const article = require('./api/article')

// 阿里云
// process.env.HOST = pconfig.host
// process.env.PORT = pconfig.port

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

app.use(session({
  secret: 'YYJ', // 用来对session id相关的cookie进行签名
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false // 是否每次都重新保存会话，建议false
}));
app.use(passport.initialize()) // 初始化passport模块
app.use(morgan('dev')) // 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 调用bodyParser模块以便程序正确解析body传入值

// Import API Routes
app.use('/', index)
app.use('/users', users)
app.use('/article', article)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
// app.listen(port, host)
let server = app.listen(port)
// socket.io server
let io = require('socket.io').listen(server)
require('./api/hichat')(io)

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
